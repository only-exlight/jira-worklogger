import { ConfigManager } from '../classes/config-manager';
import { APP_NAME, VERSION } from '../const/app-consts';

const configManager = new ConfigManager();
process.stdout.write(`Set config for ${APP_NAME} ${VERSION}`);
configManager.setConfig();