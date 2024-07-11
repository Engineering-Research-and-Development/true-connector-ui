#!/bin/sh

ENV_DIR=/usr/share/nginx/html/browser

ENV_FILE=$(find $ENV_DIR -name 'main-*.js')

replace_placeholder() {
  local placeholder=$1
  local value=$2
  local env_variable_name=${placeholder%_PLACEHOLDER}


  if [ -n "$value" ]; then
    sed -i "s|${placeholder}|${value}|g" $ENV_FILE
  else
    echo "Warning: Environment variable for ${env_variable_name} is not set or is empty. Skipping inserting."
  fi
}

if [ -f "$ENV_FILE" ]; then
  # Replace placeholders with environment variables
  replace_placeholder 'SELF_DESCRIPTION_URL_PLACEHOLDER' "$SELF_DESCRIPTION_URL"
  replace_placeholder 'PROXY_ENDPOINT_URL_PLACEHOLDER' "$PROXY_ENDPOINT_URL"
  replace_placeholder 'SELF_DESCRIPTION_API_PLACEHOLDER' "$SELF_DESCRIPTION_API"
  replace_placeholder 'CONTRACT_OFFER_API_PLACEHOLDER' "$CONTRACT_OFFER_API"
  replace_placeholder 'OFFERED_RESOURCE_API_PLACEHOLDER' "$OFFERED_RESOURCE_API"
  replace_placeholder 'REPRESENTATION_API_PLACEHOLDER' "$REPRESENTATION_API"
  replace_placeholder 'MULTIPART_TYPE_PLACEHOLDER' "$MULTIPART_TYPE"
  replace_placeholder 'FORWARD_TO_PLACEHOLDER' "$FORWARD_TO"
  replace_placeholder 'TC_AES_SECRET_KEY_PLACEHOLDER' "$TC_AES_SECRET_KEY"
  replace_placeholder 'TC_BROKER_URL_PLACEHOLDER' "$TC_BROKER_URL"
  replace_placeholder 'TC_ECC_KEYSTORE_NAME_PLACEHOLDER' "$TC_ECC_KEYSTORE_NAME"
  replace_placeholder 'TC_ECC_KEY_PASSWORD_PLACEHOLDER' "$TC_ECC_KEY_PASSWORD"
  replace_placeholder 'TC_ECC_KEYSTORE_PASSWORD_PLACEHOLDER' "$TC_ECC_KEYSTORE_PASSWORD"
  replace_placeholder 'TC_ECC_ALIAS_PLACEHOLDER' "$TC_ECC_ALIAS"
  replace_placeholder 'TC_ECC_TRUSTORE_NAME_PLACEHOLDER' "$TC_ECC_TRUSTORE_NAME"
  replace_placeholder 'TC_ECC_TRUSTORE_PASSWORD_PLACEHOLDER' "$TC_ECC_TRUSTORE_PASSWORD"
  replace_placeholder 'TC_DA_KEYSTORE_NAME_PLACEHOLDER' "$TC_DA_KEYSTORE_NAME"
  replace_placeholder 'TC_DA_KEY_PASSWORD_PLACEHOLDER' "$TC_DA_KEY_PASSWORD"
  replace_placeholder 'TC_DA_KEYSTORE_PASSWORD_PLACEHOLDER' "$TC_DA_KEYSTORE_PASSWORD"
  replace_placeholder 'TC_DA_ALIAS_PLACEHOLDER' "$TC_DA_ALIAS"
  replace_placeholder 'TC_DA_TRUSTORE_NAME_PLACEHOLDER' "$TC_DA_TRUSTORE_NAME"
  replace_placeholder 'TC_DA_TRUSTORE_PASSWORD_PLACEHOLDER' "$TC_DA_TRUSTORE_PASSWORD"
  replace_placeholder 'TC_CACHE_TOKEN_PLACEHOLDER' "$TC_CACHE_TOKEN"
  replace_placeholder 'TC_FETCH_TOKEN_ON_STARTUP_PLACEHOLDER' "$TC_FETCH_TOKEN_ON_STARTUP"
  replace_placeholder 'TC_MULTIPART_ECC_PLACEHOLDER' "$TC_MULTIPART_ECC"
  replace_placeholder 'TC_WS_ECC_PLACEHOLDER' "$TC_WS_ECC"
  replace_placeholder 'TC_IDSCP2_PLACEHOLDER' "$TC_IDSCP2"
  replace_placeholder 'TC_EXTRACT_PAYLOAD_FROM_RESPONSE_PLACEHOLDER' "$TC_EXTRACT_PAYLOAD_FROM_RESPONSE"
  replace_placeholder 'TC_VALIDATE_SELF_DESCRIPTION_PLACEHOLDER' "$TC_VALIDATE_SELF_DESCRIPTION"
  replace_placeholder 'TC_MULTIPART_EDGE_PLACEHOLDER' "$TC_MULTIPART_EDGE"
  replace_placeholder 'TC_ISSUER_CONNECTOR_URI_PLACEHOLDER' "$TC_ISSUER_CONNECTOR_URI"
  replace_placeholder 'TC_ECC_FIREWALL_PLACEHOLDER' "$TC_ECC_FIREWALL"
  replace_placeholder 'TC_DA_FIREWALL_PLACEHOLDER' "$TC_DA_FIREWALL"
  replace_placeholder 'TC_DATA_APP_ENDPOINT_PLACEHOLDER' "$TC_DATA_APP_ENDPOINT"
  replace_placeholder 'TC_WS_EDGE_PLACEHOLDER' "$TC_WS_EDGE"
  replace_placeholder 'TC_CONNECTOR_ID_PLACEHOLDER' "$TC_CONNECTOR_ID"
  replace_placeholder 'TC_UC_DATAAPP_URI_PLACEHOLDER' "$TC_UC_DATAAPP_URI"
  replace_placeholder 'TC_DAPS_KEYSTORE_NAME_PLACEHOLDER' "$TC_DAPS_KEYSTORE_NAME"
  replace_placeholder 'TC_DAPS_KEYSTORE_PASSWORD_PLACEHOLDER' "$TC_DAPS_KEYSTORE_PASSWORD"
  replace_placeholder 'TC_DAPS_KEYSTORE_ALIAS_PLACEHOLDER' "$TC_DAPS_KEYSTORE_ALIAS"

  echo "Environment variables applied!"
else
  echo "Environment file not found!"
fi

exec "$@"
