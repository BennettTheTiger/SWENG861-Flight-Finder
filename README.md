# SWENG 861 Flight Finder
- Final project for PSU SWENG 861
- Check it out for yourself [here](https://sweng-861-flight-finder.onrender.com/)
- See the powerpoint in the pptx folder

## How to run locally
There are two 'projects' within this repo. The server and the client

### Configure Enviorment Variables
Create this file at the root of this project
- Visit Amedaus to [get your credentials](https://developers.amadeus.com/get-started/get-started-with-self-service-apis-335) 
- `API_KEY`
- `API_SECRET`
- `PORT` - port you want your server to run on. 
     (3001 should make this work by default)

### Running the server
1. `cd server`
2. `npm run install` - this grabs all depednecies and creates a node_modules folder
3. `npm run local`

### Running the client
1. `cd client`
2. `npm run install` - this grabs all depednecies and creates a node_modules folder.
3. Ensure your server is up and running on the `PORT` you specified above.
4. In the root of the package.json file in the `/client` directory set `"proxy": "http://localhost:YOUR_ENV_PORT_VALUE_HERE"`
5. `npm run local`
6. Making updates to the client should cause a refresh and your changes should update the page.
7. See the `README.md` in the client for more details. 