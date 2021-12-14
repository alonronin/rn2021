import * as pulumi from '@pulumi/pulumi';
import * as awsx from '@pulumi/awsx';
import * as eks from '@pulumi/eks';
import * as k8s from '@pulumi/kubernetes';
import { certManager } from './cert-manager';
import { externalDns } from './external-dns';
import { ingressNginx } from './nginx';

const projectName = 'rn-2021';
const zoneId = 'Z07315847WBNAQT6PGD6';

// Create the EKS cluster itself and a deployment of the Kubernetes dashboard.
const cluster = new eks.Cluster(projectName, {
  instanceType: 't2.medium',
  createOidcProvider: true,
});

// Export the cluster's kubeconfig.
export const kubeConfig = cluster.kubeconfig;

const clusterOidcProvider = cluster.core.oidcProvider;

if (!clusterOidcProvider) {
  throw new Error('no cluster oidc provider');
}

const provider = new k8s.Provider('k8s', {
  kubeconfig: kubeConfig.apply(JSON.stringify),
});

export const { ingressNginxNamespace } = ingressNginx(provider);

export const { certManagerNamespace, certManagerServiceAccount } = certManager(
  clusterOidcProvider,
  provider,
  zoneId
);

export const { externalDnsNamespace, externalDnsServiceAccount } = externalDns(
  clusterOidcProvider,
  provider,
  zoneId
);
