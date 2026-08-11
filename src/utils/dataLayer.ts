type DataLayerPayload = Record<string, unknown> & { event: string }

export function pushToDataLayer(payload: DataLayerPayload) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}
