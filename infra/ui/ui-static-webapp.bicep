param serviceName string
param location string = resourceGroup().location

param sku object = {
  name: 'Free'
  tier: 'Free'
}

resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: serviceName
  location: location
  sku: sku
  properties: {
    provider: 'Custom'
  }
}
