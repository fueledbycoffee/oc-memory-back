/**
 * responsePayloadHandler - Mettre en forme les réponses d'API
 */
const status = {
  OK: "ok",
  ERROR: "error",
  PARTIAL: "partial",
  CREATED: "created",
  FAILED: "failed"
}

const getPayload = (status, data, err, message) => {
  return {
    status,
    data,
    err,
    message
  }
}

module.exports = {
  getPayload,
  status
}