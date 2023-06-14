param speechServiceName string
param textAnalyticsServiceName string
param openAIServiceName string
param location string = resourceGroup().location

module speechService '../core/ai/speech.bicep' = {
  name: 'speechServiceDeployment'
  params: {
    serviceName: speechServiceName
    location: location
  }
}

module textAnalyticsService '../core/ai/textanalytics.bicep' = {
  name: 'textAnalyticsServiceDeployment'
  params: {
    serviceName: textAnalyticsServiceName
    location: location
  }
}

module openAIService '../core/ai/openai.bicep' = {
  name: 'openAIServiceDeployment'
  params: {
    serviceName: openAIServiceName
    location: location
  }
}
