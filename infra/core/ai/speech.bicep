param serviceName string
param location string = resourceGroup().location
param sku string = 'S0'

resource speechService 'Microsoft.CognitiveServices/accounts@2021-10-01' = {
  name: serviceName
  location: location
  kind: 'SpeechServices'  
  sku: {
    name: sku
  }
  properties: {
    apiProperties: {
      statisticsEnabled: false
    }
  }
}
