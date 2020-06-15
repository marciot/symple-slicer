/**
 * WebSlicer
 * Copyright (C) 2020  SynDaver Labs, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

async function flashArchimFirmware() {
    try {
        ProgressBar.message("Loading firmware");
        const data         = await fetchFile("firmware/SynDaver_Axi_Marlin_R2.bin");
        const bossa        = await import('../lib/flashing-tools/bossa/bossa.js');
        const programmer   = new bossa.BOSSA();
        const archimMarlin = {vendorId: "27B1", productId: "0001"};
        const archimSamba  = {vendorId: "03EB", productId: "6124"};
        
        ProgressBar.message("Finding printers");
        programmer.onProgress = ProgressBar.progress;
        
        // See if there are devices in the Samba bootloader
        var matches = await programmer.find_devices(archimSamba);
        if(matches.length == 0) {
            // If none are found, try resetting active printers
            matches = await programmer.find_devices(archimMarlin);
            if(matches.length == 0) {
                throw Error("No printers found");
            }
            await programmer.reset_to_bootloader(matches[0]);
            // See if there are now devices in the Samba bootloader
            matches = await programmer.find_devices(archimSamba);
            if(matches.length == 0) {
                throw Error("Unable to enter bootloaders");
            }
        }
        await programmer.connect(matches[0]);
        ProgressBar.message("Writing firmware");
        await programmer.flash_firmware(data);
        await programmer.reset_and_close();
    } catch(err) {
        console.error(err);
        alert(err);
    } finally {
        ProgressBar.hide();
    }
}