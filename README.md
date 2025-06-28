# Configure the application by editting .env and .env.local.
Should only have to change the ports and ip_addresses to the designated server(s) information.

SERVER_NETWORK_SOCKET_PORT=(port)
SERVER_NETWORK_HOST_IP=(ip_address_of_machine)

NEXT_PUBLIC_META_CLIENT_SERVER_URL=http://(ip_address_of_machine):(port)
NEXT_PUBLIC_META_MAIL_SERVER_URL=http://(ip_address_of_machine):(port)
NEXT_PUBLIC_META_USER_SERVER_URL=http://(ip_address_of_machine):(port)
NEXT_PUBLIC_META_CHAT_SERVER_URL=http://(ip_address_of_machine):(port)
NEXT_PUBLIC_META_CHAT_SOCKET_URL=ws://(ip_address_of_machine):(port)


# Manual CLI build command: 
1) Navigate CLI to folder and use

npm run dev
npm run build
npm run start

# Docker Setup Option 1) for CLI command:
1) Navigate CLI to folder and use 

docker-compose up --build
docker compose -f mpc_reactbootstrap_nextjs_spa.yaml up -d

# Docker Setup Option 2) startup for CLI command:
1) Navigate CLI to folder and use
docker build -t mpc_dotnetc_user_server_rom .
docker run -d -p {SERVER_NETWORK_PORT_NUMBER}:{DOCKER_CONTAINER_PORT_NUMBER} --name mpc_reactbootstrap_nextjs_spa mpc_reactbootstrap_nextjs_spa_rom

# Accessing the Application
Once the app is running, access it from a browser on any device within the same network:

1) Launch the SPA
2) Open your browser
3) Navigate to ip address that is being used to host the application -- it should match the configured ip_address_ in your .env file and your .env.local. file.

# Package.json Notes
The package.json has been configured to expose the application on all network interfaces (0.0.0.0) for LAN access and should be removed if used on the internet:

  "scripts": {
    "dev": "next dev -H 0.0.0.0 -p 3000",
    "build": "next build -H 0.0.0.0 -p 3000",
    "start": "next start -H 0.0.0.0 -p 3000"
  },