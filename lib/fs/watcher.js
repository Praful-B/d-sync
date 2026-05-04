import fs from 'fs';
import * as path from "path"
import * as chokidar from "chokidar";

class Watcher {
    ignore_list = {};
    constructor(folder_path, folder_name) {
        this.folder_path = folder_path;
        this.folder_name = folder_name;
        this.final_path = path.join(this.folder_path, this.folder_name);
    }

    _check_path_exists() {
        return fs.existsSync(this.folder_path);
    }

    _check_folder_exists() {
        if(this._check_path_exists()){
            return fs.existsSync(this.final_path);
        }
    }

    _create_folder() {
        if (this._check_folder_exists()) return;
        try {
            fs.mkdirSync(this.final_path, { recursive: true });
        } catch (e) {
            throw new Error(`Failed to create folder "${this.folder_name}": ${e.message}`);
        }
    }

    _append_to_sync_ignore_list(){
        const wf_ignore = chokidar.watch(this.final_path, {
            ignored: (path, stats) => stats?.isFile() && !path.endsWith('.syncignore'),
        });
        wf_ignore.on('add', (path, stats) => {
                fs.readFile(path, 'utf8', (err, data) => {
                    if (err) {throw err;}
                    this.ignore_list.append(data.split("/\r?\n/"));
                    })
                })
                .on('change', (path, stats) => {
                    this.ignore_list.clear();
                    fs.readFile(path, 'utf8', (err, data) => {
                        if(err) {throw err;}
                        this.ignore_list.append(path, stats);
                    })
                })

    }

    start(){
        if(!this._check_path_exists()) { // check path and folder validity
            throw new Error(`path is invalid. Enter a valid path. given: ${this.folder_name}`);
        }
        try{
            if(!this._check_folder_exists()) {
                this._create_folder();
            }
        } catch (e) {
            console.error(e);
        }




    }
}

export default Watcher;