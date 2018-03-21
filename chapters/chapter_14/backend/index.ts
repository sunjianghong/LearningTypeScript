import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { bindings } from "./inversify.config";

(async () => {

    try {

        const port = 3000;
        const container = new Container();
        await container.loadAsync(bindings);
        const app = new InversifyExpressServer(container);

        app.setConfig((a) => {
            a.use();
        });

        const server = app.build();
        
        server.listen(port, () => {
            console.log(`Server running at http://127.0.0.1:${port}/`)
        });
    
    } catch(e) {
        console.log(e);
    }

})();
