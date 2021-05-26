/*
 * Copyright © 2021 Daniel García
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the licence, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library. If not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Daniel García <dagaba13@gmail.com>
 * Based on: https://github.com/sramkrishna/gnome3-extensions
 * 		Author: Sriram Ramkrishna <sri@ramkrishna.me>
 */

const {St, Clutter} = imports.gi;
let _lockScreenButton = null;

const Main = imports.ui.main; // Without this class we can't use the button
const Util = imports.misc.util; // We need this class to execute commands 

function init() {
	_lockScreenButton = new St.Bin({ style_class: 'panel-button', 
								reactive: true,
								can_focus: true,
								y_align: Clutter.ActorAlign.CENTER,
								track_hover: true });
	let icon = new St.Icon ({ icon_name: 'changes-prevent-symbolic',
								style_class: 'system-status-icon'});
	_lockScreenButton.set_child(icon);
	_lockScreenButton.connect('button-press-event', _LockScreenActivate);
}

function _LockScreenActivate () {
	Util.spawn(['/bin/bash', '-c', "xscreensaver-command -lock"]);
}


function enable () {
	Main.panel._rightBox.insert_child_at_index(_lockScreenButton,0);
}

function disable () {
	Main.panel._rightBox.remove_actor(_lockScreenButton);
}