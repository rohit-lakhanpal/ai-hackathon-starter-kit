param serviceName string
param location string = resourceGroup().location
param sku string = 'S'

resource textAnalyticsService 'Microsoft.CognitiveServices/accounts@2021-10-01' = {
  name: serviceName
  location: location
  kind: 'TextAnalytics'  
  sku: {
    name: sku
  }
}
