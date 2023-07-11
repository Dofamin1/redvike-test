import { connectAllExternalServices } from './server-internals/utils';
import initHttpGateway from './gateways/http/http.gateway';

async function start() {
  await connectAllExternalServices();
  await initHttpGateway();
}

start();
