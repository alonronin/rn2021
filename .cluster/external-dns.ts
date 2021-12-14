import * as k8s from '@pulumi/kubernetes';
import { createNamespace, createServiceAccount } from './utils';
import * as aws from '@pulumi/aws';

export const externalDns = (
  clusterOidcProvider: aws.iam.OpenIdConnectProvider,
  provider: k8s.Provider,
  zoneId: string
) => {
  const externalDnsNamespace = createNamespace('external-dns', provider);

  const externalDnsPolicy = new aws.iam.Policy('external-dns', {
    description: 'External Dns policy',
    policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['route53:ChangeResourceRecordSets'],
          Resource: [`arn:aws:route53:::hostedzone/${zoneId}`],
        },
        {
          Effect: 'Allow',
          Action: ['route53:ListHostedZones', 'route53:ListResourceRecordSets'],
          Resource: ['*'],
        },
      ],
    }),
  });

  const externalDnsServiceAccount = createServiceAccount(
    'external-dns',
    externalDnsNamespace,
    clusterOidcProvider,
    provider,
    externalDnsPolicy.arn
  );

  return {
    externalDnsNamespace,
    externalDnsPolicy,
    externalDnsServiceAccount,
  };
};
