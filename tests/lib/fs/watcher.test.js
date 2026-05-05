import Watcher from '/lib/fs/watcher';
import { expect, test } from 'vitest';
import * as path from 'node:path';

test('watcher check path exists', () => {
  const path = 'C:/Users/user/Pictures/';
  const folder_name = 'd_sync_folder';
  const wf = new Watcher(path, folder_name);
  expect(wf._check_path_exists(path)).toBe(true);
});

test('watcher checks folder name exists', () => {
  const path = 'C:/Users/user/Pictures/';
  const folder_name = 'd_sync_folder';
  const wf = new Watcher(path, folder_name);
  expect(wf._check_folder_exists()).toBe(true);
});

// test('creates folder', () => {
// const
// })
