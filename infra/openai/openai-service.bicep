param serviceName string
param location string = resourceGroup().location
param sku string = 'S0'

resource openAIService 'Microsoft.CognitiveServices/accounts@2021-10-01' = {
  name: serviceName
  location: location
  kind: 'OpenAI'
  sku: {
    name: sku
  }
  properties: {
    customSubDomainName: toLower(serviceName)
  }
}
