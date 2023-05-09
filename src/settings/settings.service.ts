import { Settings } from './settings';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
    public settings: Settings;

    constructor() {
        this.settings = new Settings();
    }
}
