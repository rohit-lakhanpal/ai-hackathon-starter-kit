param serviceName string
param location string = resourceGroup().location
param sku string = 'F1'
param appServicePlanName string = toLower('AppServicePlan-${serviceName}')

resource appServicePlan 'Microsoft.Web/serverfarms@2020-06-01' = {
  name: appServicePlanName
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: sku
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2021-02-01' = {
  name: serviceName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
  }
}
