param serviceName string
param location string = resourceGroup().location
param sku string = 'Free'

param repositoryUrl string
param repositoryBranch string
param appLocation string

resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: serviceName
  location: location
  sku: {
    name: sku
    tier: sku
  }  
  properties: {
    provider: 'GitHub'
    repositoryUrl: repositoryUrl
    repositoryToken: '<your-github-personal-access-token>'    
    branch: repositoryBranch
    buildProperties: {
      appLocation: appLocation
      apiLocation: 'api'
      outputLocation: 'build'
    }
  }
}
