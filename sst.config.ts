import { SSTConfig } from "sst";
import { StaticSite } from "sst/constructs";

export function DocsStack({ stack }) {
  // Deploy our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "docs",
    customDomain: {
      domainName: "docs.mage.studio",
      domainAlias: "www.docs.mage.studio",
      hostedZone: "mage.studio",
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}

export const config = {
  name: "MageStudioDocs",
  region: "us-east-1",
};

export default {
  config(_input) {
    return config;
  },
  stacks(app) {
    app.stack(DocsStack);
  },
};
