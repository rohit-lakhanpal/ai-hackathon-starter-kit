param apiServiceName string = 'ApiWebApp-${uniqueString(resourceGroup().id)}'
param uiServiceName string = 'UiWebApp-${uniqueString(resourceGroup().id)}'
param appServicePlanName string = toLower('AppServicePlan-${uniqueString(resourceGroup().id)}')
param location string = 'eastus'

// param repositoryUrl string = 'https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/'
// param appLocation string = '/src/ui'
// param repositoryBranch string = 'main'

module apiService './api/api-webapp.bicep' = {
  name: 'apiWebAppDeployment'
  params: {
    serviceName: apiServiceName
    location: location
    appServicePlanName: appServicePlanName
  }
}

// Prefer to do this as a static web app but need to play with the bicep
// a bit more since we want a custom nodejs api behind it

// module uiService './ui/ui-static-webapp.bicep' = {
//   name: 'textAnalyticsServiceDeployment'
//   params: {
//     serviceName: uiServiceName
//     location: location
//     repositoryUrl: repositoryUrl
//     repositoryBranch: repositoryBranch
//     appLocation: appLocation
//   }
// }

module uiService './ui/ui-webapp.bicep' = {
  name: 'uiWebAppDeployment'
  params: {
    serviceName: uiServiceName
    location: location
    appServicePlanName: appServicePlanName    
  }
}
