import {AppConfigService} from "../../services";


export function appConfig(app: AppConfigService) {
	return () => app.loadConfig();
}
