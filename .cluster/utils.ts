import * as k8s from "@pulumi/kubernetes";
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export const createServiceAccount = (
  name: string,
  namespace: k8s.core.v1.Namespace,
  clusterOidcProvider: aws.iam.OpenIdConnectProvider,
  provider: k8s.Provider,
  policyArn: pulumi.Output<string>
) => {
  const saAssumeRolePolicy = pulumi
    .all([
      clusterOidcProvider.url,
      clusterOidcProvider.arn,
      namespace.metadata.name,
    ])
    .apply(([url, arn, namespace]) =>
      aws.iam.getPolicyDocument({
        statements: [
          {
            actions: ["sts:AssumeRoleWithWebIdentity"],
            conditions: [
              {
                test: "StringEquals",
                values: [`system:serviceaccount:${namespace}:${name}`],
                variable: `${url.replace("https://", "")}:sub`,
              },
            ],
            effect: "Allow",
            principals: [
              {
                identifiers: [arn],
                type: "Federated",
              },
            ],
          },
        ],
      })
    );

  const saRole = new aws.iam.Role(name, {
    assumeRolePolicy: saAssumeRolePolicy.json,
  });

  // Attach the S3 read only access policy.
  new aws.iam.RolePolicyAttachment(name, {
    policyArn,
    role: saRole,
  });

  return new k8s.core.v1.ServiceAccount(
    name,
    {
      metadata: {
        namespace: namespace.metadata.name,
        name,
        annotations: {
          "eks.amazonaws.com/role-arn": saRole.arn,
        },
      },
    },
    { provider }
  );
};

export const createNamespace = (namespace: string, provider: k8s.Provider) =>
  new k8s.core.v1.Namespace(namespace, undefined, {
    provider,
  });
