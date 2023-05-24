param speechServiceName string = 'SpeechService-${uniqueString(resourceGroup().id)}'
param textAnalyticsServiceName string = 'TextAnalyticsService-${uniqueString(resourceGroup().id)}'
param openAIServiceName string = 'OpenAIService-${uniqueString(resourceGroup().id)}'
param location string = 'eastus'

module speechService './speech/speech-service.bicep' = {
  name: 'speechServiceDeployment'
  params: {
    serviceName: speechServiceName
    location: location
  }
}

module textAnalyticsService './text-analytics/text-analytics.bicep' = {
  name: 'textAnalyticsServiceDeployment'
  params: {
    serviceName: textAnalyticsServiceName
    location: location
  }
}

module openAIService './openai/openai-service.bicep' = {
  name: 'openAIServiceDeployment'
  params: {
    serviceName: openAIServiceName
    location: location
  }
}
