import Watcher from '../lib/fs/watcher.js';

const wf = new Watcher('C:/Users/user/Pictures/', 'd_sync_folder');

wf.start();
