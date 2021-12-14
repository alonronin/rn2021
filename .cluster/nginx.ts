import * as k8s from "@pulumi/kubernetes";
import { createNamespace } from "./utils";

export const ingressNginx = (provider: k8s.Provider) => {
  const ingressNginxNamespace = createNamespace("ingress-nginx", provider);

  return {
    ingressNginxNamespace,
  };
};
