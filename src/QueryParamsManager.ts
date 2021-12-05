export class QueryParamsManager {
    private params: URLSearchParams;

    constructor() {
        this.params = new URLSearchParams(window.location.search)
    }

    getDifficulty(){
        try {
            if(this.params.has('spawners')){
                const diff = parseInt(<string>this.params.get('spawners'))

                if(diff < 1 || diff > 4){
                    return 1;
                }else{
                    return diff;
                }
            }else {
                return 1;
            }
        }catch (e) {
            return 1;
        }
    }
}

export const queryParamsManager = new QueryParamsManager();