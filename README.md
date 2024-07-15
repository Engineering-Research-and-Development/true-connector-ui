# TRUE Connector UI Application

[![License: AGPL](https://img.shields.io/github/license/Engineering-Research-and-Development/true-connector-execution_core_container.svg)](https://opensource.org/licenses/AGPL-3.0)
[![Docker badge](https://img.shields.io/docker/pulls/rdlabengpa/ids_true_connector_ui.svg)](https://hub.docker.com/r/rdlabengpa/ids_true_connector_ui)
<br/>

![](https://github.com/Engineering-Research-and-Development/true-connector/raw/main/doc/TRUE_Connector_Logo.png?raw=true)

</br></br>

<h1>
TRUE ('TRU'sted 'E'ngineering) Connector UI for the IDS (International Data Space) ecosystem 
</h1>

The TRUE Connector UI is a frontend application developed by Engineering, a leading digital transformation company based in Italy. This UI application is part of the TRUE Connector suite, designed to enable self-determined data sharing while ensuring compliance with regulations such as GDPR. The application provides user-friendly interfaces for managing self description, policies, and contract negotiations within the IDS ecosystem.

## Features

- **Self Description Management**: View, and update self descriptions data of connector, such are offered resources, contract offers, and representations.
- **Policies Management**: View or delete usage policies for data resources.
- **Contract Negotiation**: Engage in contract negotiations for data sharing between provider and consumer.
- **Multi-Account Support**: Seamlessly switch between provider and consumer roles within the application.
- **Connector configuration**: Overview of connector configuration details previosly setup in `application.properties` of ECC, DataApp and UCApp.

## Current implement features

- **Self Description Management**: View self descriptions data of connector, such are offered resources, contract offers, and representations.
- **Policies Management**: /
- **Contract Negotiation**: Getting the artifact without usage of UCApp (no full contact negotiation flow)
- **Multi-Account Support**: Seamlessly switch between provider and consumer roles within the application.
- **Connector configuration**: Overview of connector configuration details previosly setup in `application.properties` of ECC, DataApp and UCApp.

## User manual

For comprehensive instructions and visual guides, please refer to the [User Manual](/doc/TRUE_Connector_UI_user_manual.pdf). This document includes detailed explanations and UI screenshots to help you effectively navigate and utilize all the application's features.

## Prerequisites

- `Node.js` and `npm`
- `Angular CLI`

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/Engineering-Research-and-Development/true-connector-ui.git
   cd true-connector-ui
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory and set the necessary environment variables. Example:

   ```
   SELF_DESCRIPTION_URL: 'https://......',
   PROXY_ENDPOINT_URL: 'https://......',
   SELF_DESCRIPTION_API: 'https://......',
   CONTRACT_OFFER_API: 'https://......',
   OFFERED_RESOURCE_API: 'https://......',
   REPRESENTATION_API: 'https://......',
   MULTIPART_TYPE: 'form',
   FORWARD_TO: 'https://......',
   ```

   The TRUE Connector UI displays configuration details for other components of the TRUE Connector, such as ECC, DA, and UC. To enable these details to be shown, you can use the following environment variables:

   ```
   TC_DATA_APP_ENDPOINT
   TC_MULTIPART_EDGE
   TC_MULTIPART_ECC
   TC_CONNECTOR_ID
   TC_IDSCP2
   TC_WS_EDGE
   TC_WS_ECC
   TC_UC_DATAAPP_URI
   TC_BROKER_URL
   TC_CACHE_TOKEN
   TC_FETCH_TOKEN_ON_STARTUP
   TC_ECC_KEYSTORE_NAME
   TC_ECC_KEY_PASSWORD
   TC_ECC_KEYSTORE_PASSWORD
   TC_ECC_ALIAS
   TC_DAPS_KEYSTORE_NAME
   TC_DAPS_KEYSTORE_PASSWORD
   TC_DAPS_KEYSTORE_ALIAS
   TC_ECC_TRUSTORE_NAME
   TC_ECC_TRUSTORE_PASSWORD
   TC_ECC_FIREWALL
   TC_AES256_SECRET_KEY
   TC_DA_KEYSTORE_NAME
   TC_DA_KEY_PASSWORD
   TC_DA_KEYSTORE_PASSWORD
   TC_DA_ALIAS
   TC_EXTRACT_PAYLOAD_FROM_RESPONSE
   TC_ISSUER_CONNECTOR_URI
   TC_DA_FIREWALL
   TC_VALIDATE_SELF_DESCRIPTION

   ```

4. **Run the application:**

   ```
   ng serve
   ```

   The application will be available at `http://localhost:4200`.

## Docker Deployment

To run the UI application using Docker Compose, follow these steps:

1. **Build the Docker image:**

   ```
   docker build -t true-connector-ui .
   ```

2. **Run Docker Compose:**
   Ensure your `docker-compose.yml` is correctly configured with environment variables for the UI application. Example:

   ```
   version: "3.7"
   services:
     ui:
       image: true-connector-ui
       environment:
         - SELF_DESCRIPTION_URL: "https://......"
         - ....
         - ....
       ports:
         - "4200:80"
   ```

   Then start the services:

   ```sh
   docker-compose up
   ```

   The application will be available at `http://localhost:4200`.

### SSL Deployment with Docker

1. If you want to have both HTTP and HTTPS instances, keep **nginx.conf** file unchanged:

```
  events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html/browser;
    index index.html index.htm;

    location / {
      try_files $uri $uri/ /index.html;
    }

    # Redirect all HTTP traffic to HTTPS
    # Use in case that you want only HTTPS communication
    # Uncomment out the following lines to allow both HTTP and HTTPS
    # if ($scheme = http) {
    #   return 301 https://$server_name$request_uri;
    # }
  }

  server {
    listen 443 ssl;
    server_name localhost;

    ssl_certificate /etc/nginx/ssl/{CERT_NAME}.crt;
    ssl_certificate_key /etc/nginx/ssl/{CERT_NAME}.key;

    root /usr/share/nginx/html/browser;
    index index.html index.htm;

    location / {
      try_files $uri $uri/ /index.html;
    }
  }

```

2. **Update Docker Compose:**
   Modify your `docker-compose.yml` to include the Nginx configuration and SSL certificates. Example:

```
   version: "3.7"
   services:
     ui:
       image: true-connector-ui
       environment:
         - SELF_DESCRIPTION_URL: "https://......"
         - ....
         - ....
       ports:
         - "4200:80"
         - "4201:443"
       volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf
         - ./{PATH_TO_CERTS}:/etc/nginx/ssl
```

Ensure you have your SSL certificates (`{CERT_NAME}.crt` and `{CERT_NAME}.key`) in the `./{PATH_TO_CERTS}` directory.

3. **Start the Services:**

```
   docker-compose up
```

The application will be available at both `http://localhost:4200 (HTTP)` and `https://localhost:4201 (HTTPS)`.

## Usage

### Self Description Management

Choose Self Description Management section from side menu to view self description data, and update it if needed. You can add new offered resources, contract offers or representations, update existing ones, and ensure all necessary metadata is correctly specified.

### Policies Management

In the Policies Management section, you can view or delete usage policies for your data resources. These policies ensure that data sharing complies with regulations and agreements.

### Contract Negotiation

The Contract Negotiation feature allows providers and consumers to engage in secure and compliant contract negotiations. This ensures that all data exchanges are legally binding and transparent.

## Contributing

We welcome contributions to the TRUE Connector UI application. Please follow these steps to contribute:

1. **Fork the repository:**

   ```sh
   git fork https://github.com/Engineering-Research-and-Development/true-connector-ui.git
   ```

2. **Create a feature branch:**

   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes:**

   ```sh
   git commit -m "Add your feature description"
   ```

4. **Push to the branch:**

   ```sh
   git push origin feature/your-feature-name
   ```

5. **Open a pull request:**
   Go to the repository on GitHub and open a pull request to the `develop` branch.

## License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for details.

## More information

For further information, visit our [documentation](https://engineering-ing-inf-rd.gitbook.io/true-connector/) or contact the support team at trueconnector-team@eng.it.
