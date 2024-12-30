export default class{
    constructor(env){
        if(env.k3p){
            this.get = env.k3p.get.bind(env.k3p);
            this.put = env.k3p.put.bind(env.k3p);
            this.delete = env.k3p.delete.bind(env.k3p);
        }else if(env.fs){
            env.fs.mkdir("test/bucket", {recursive: true});
            this.get = async (key) => {
                try{
                    await env.fs.promises.access(`test/bucket/${`test/bucket/${key}`}`);
                    return env.fs.promises.readFile(`test/bucket/${key}`);
                }catch{
                    return null;
                }
            },
            this.put = async (key, body) => {
                await env.fs.promises.writeFile(`test/bucket/${key}`, body);
            }
            this.delete = async (key) => {
                await env.fs.promises.rm(`test/bucket/${key}`);
            }
        }
    }
}