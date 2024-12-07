function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

function c() {
    var ag = document.getElementById('ag');
    if (ag.value == "") {
        document.getElementById("msg").innerHTML = "Sila masukkan angka giliran sebelum tekan butang Semak!";
        ag.focus();
        return false;
    }
    re = /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z1-8][0-9]{3}$/;
    if (!re.test(ag.value)) {
        document.getElementById("msg").innerHTML = "Sila pastikan angka giliran adalah dalam format AB123A123!";
        ag.focus();
        return false;
    }
    fetch('/qr/catch/me/if/you/can.json').then(x => x.text()).then(
        async data => {
            var data;
            var N = ["SIFAR","SATU","DUA","TIGA","EMPAT","LIMA","ENAM","TUJUH","LAPAN","SEMBILAN","SEPULUH"]
            var status = {
                "A+": "CEMERLANG TERTINGGI",
                "A": "CEMERLANG TINGGI",
                "A-": "CEMERLANG",
                "B+": "KEPUJIAN TERTINGGI",
                "B": "KEPUJIAN TINGGI",
                "C+": "KEPUJIAN ATAS",
                "C": "KEPUJIAN",
                "D": "LULUS ATAS",
                "E": "LULUS",
                "G": "GAGAL",
                "TH": "TIDAK HADIR"
            }
            var code = {
                "BAHASA MELAYU": "1103",
                "BAHASA INGGERIS": "1119",
                "PENDIDIKAN ISLAM": "1223",
                "SEJARAH": "1249",
                "MATEMATIK": "1449",
                "PENDIDIKAN SENI VISUAL": "2611",
                "PENDIDIKAN MORAL": "1125",
                "PENDIDIKAN KESELAMATAN": "1203",
                "PENDIDIKAN JASMANI": "1210",
                "PENDIDIKAN KEUSAHAWANAN": "1307",
                "PENDIDIKAN KERJAYA": "1308",
                "PENDIDIKAN KHAS": "1114",
                "PENDIDIKAN TEKNOLOGI": "1401",
                "SAINS": "1323",
                "PENDIDIKAN SAINS KOMPUTER": "1405",
                "BASIC MATHEMATICS": "1420",
                "GEOGRAFI": "1434",
                "PSIKOMOTOR": "1502",
                "KEMAHIRAN HIDUP": "1508",
                "FIZIK": "1330",
                "PHYSICS": "1331",
                "MATEMATIK TAMBAHAN": "1450",
                "ADDITIONAL MATHEMATICS": "1451",
                "BIOLOGI": "1332",
                "BIOLOGY": "1333",
                "KIMIA": "1340",
                "CHEMISTRY": "1341"
            };            
            data = JSON.parse(data)[ag.value];
            if (data === undefined) {
                document.getElementById("msg").innerHTML = "Sijil tidak dijumpai!<br>Pastikan angka giliran adalah betul atau imbas semula kod QR.";
                ag.focus();
                return false
            }
            var structure;
            // Part 1
            structure += await fetch('/qr/catch/me/if/you/smart.html').then(x => x.text());
            structure += data.year + '</b><br><br></p>';
            structure += `<div class="w3-row">
                <div class="w3-col">NAMA : ${data.name}</div>
            </div>
            <div class="w3-row">
                <div class="w3-half">NO. PENGENALAN DIRI : ${data.kp}</div>
                <div class="w3-half">ANGKA GILIRAN : ${data.code}</div>
            </div>
            <div class="w3-row">
                <div class="w3-col">SEKOLAH : ${data.sk}</div>
            </div>
            <div class="w3-row">
                <div class="w3-col">JUMLAH MATA PELAJARAN : ${N[Object.keys(data.mp).length]}</div>
            </div><br>
            <table style="width:100%" id="tbl">
                <tbody><tr style="line-height:1;">
                    <th class="w3-left-align">KOD</th>
                    <th class="w3-left-align">NAMA MATA PELAJARAN</th>
                    <th class="w3-left-align">GRED</th>
                    <th class="w3-left-align">TAFSIRAN GRED</th>
                </tr>
                <tr style="line-height:0.8;"><td>&nbsp;</td><td></td><td></td></tr>`
            for (let i = 0; i < Object.keys(data.mp).length; i++) {
                let tmp = Object.keys(data.mp);
                structure += `
                <tr style="line-height:1.3;">
                    <td>${code[tmp[i]]}</td>
                    <td>${tmp[i]}</td>
                    <td>&nbsp;&nbsp;${data.mp[tmp[i]]}</td>
                    <td>${status[data.mp[tmp[i]]]}</td>
                </tr>
                `
            }
            structure += `</tbody></table>
            <br><br>
            <div id="overallRem" class="w3-center" style="display: none;"><br><br><br><br></div>
            <div id="sumRem" class="w3-left">${data.bt}<br><br><br></div>
            </div>

            <div id="sum" class="w3-card w3-margin-bottom">
            <header class="w3-teal w3-container">
                <h5>Tahun Peperiksaan ${data.year}</h5>
            </header>
            <div class="w3-container w3-sand">
            <div class="w3-margin-top">
                <div style="line-height:1;"><span style="display:inline-block;padding-right:24px;">${data.kp}</span><span style="display:inline-block;">${data.code}</span></div>
                <div class="w3-xlarge" style="line-height:1.1;"><b>${titleCase(data.name)}</b></div>
            </div>
            <div class="w3-margin-top">
                <span class="w3-xlarge w3-text-blue" style="line-height:1.1;display:block;"><b>Layak Mendapat Sijil</b></span>
                <span style="display:inline-block;padding-right:16px;"><span class="w3-xxlarge" style="line-height:1;">${Object.keys(data.mp).length}</span><span>mp</span><span style="display:block;line-height:1;">Daftar</span></span>
                <span style="display:inline-block;padding-right:16px;"><span class="w3-xxlarge" style="line-height:1;">100</span><span>%</span><span style="display:block;line-height:1;">Kelulusan</span></span>
                <span style="display:inline-block;padding-right:16px;"><span class="w3-xxlarge" style="line-height:1;">${Object.keys(data.mp).length}</span><span>mp</span><span style="display:block;line-height:1;">Lulus</span></span>
                <span style="display:inline-block;padding-right:16px;"><span class="w3-xxlarge" style="line-height:1;">0</span><span>mp</span><span style="display:block;line-height:1;">Gagal</span></span>
            </div>
            <div class="w3-margin-top w3-margin-bottom">`
            var stats = {} // Boom
            for (let grade in status) {
                if (status.hasOwnProperty(grade)) {
                    if (stats[grade] == undefined) {
                        stats[grade] = [];
                    }
                }
            }
            for (let subject in data.mp) {
                if (data.mp.hasOwnProperty(subject)) {
                    stats[data.mp[subject]].push(subject)
                }
            }
            structure += `
            <table style="width:1%;margin:0px">
                <tbody><tr style="line-height:1.1;">
                    <tbody><tr style="line-height:1.1;">
                    <td class="w3-right"><span class="w3-xxlarge" style="vertical-align: middle">${stats['A+'].length}</span></td>
                    <td class=""><span class="w3-tag w3-purple w3-round-large" style="vertical-align: middle;line-height:1.5;">A+</span></td>
                    <td><span>&nbsp;</span></td>
                    <td class="w3-right"><span class="w3-xxlarge  w3-right-align" style="vertical-align: middle">${stats['A'].length}</span></td>
                    <td><span class="w3-tag w3-purple w3-round-large" style="vertical-align: middle;line-height:1.5;">&nbsp;A&nbsp;</span></td>
                    <td><span>&nbsp;</span></td>
                    <td class="w3-right"><span class="w3-xxlarge" style="vertical-align: middle">${stats['A-'].length}</span></td>
                    <td><span class="w3-tag w3-purple w3-round-large" style="vertical-align: middle;text-align:center;line-height:1.5;">A-&nbsp;</span></td>
                    <td></td><td></td><td></td>
                </tr>
                <tr style="line-height:1.1;">
                    <td class="w3-right"><span class="w3-xxlarge" style="vertical-align: middle;text-align:right;">${stats['B+'].length}</span></td>
                    <td><span class="w3-tag w3-blue w3-round-large" style="vertical-align: middle;line-height:1.5;">B+</span></td>
                    <td><span>&nbsp;</span></td>
                    <td class="w3-right"><span class="w3-xxlarge" style="vertical-align: middle">${stats['B'].length}</span></td>
                    <td><span class="w3-tag w3-blue w3-round-large" style="vertical-align: middle;line-height:1.5;">&nbsp;B&nbsp;</span></td>
                    <td><span>&nbsp;</span></td>
                    <td class="w3-right"><span class="w3-xxlarge" style="vertical-align: middle">${stats['C+'].length}</span></td>
                    <td><span class="w3-tag w3-blue w3-round-large" style="vertical-align: middle;line-height:1.5;">C+</span></td>
                    <td><span>&nbsp;</span></td>
                    <td class="w3-right"><span class="w3-xxlarge" style="vertical-align: middle">${stats['C'].length}</span></td>
                    <td><span class="w3-tag w3-blue w3-round-large" style="vertical-align: middle;line-height:1.5;">&nbsp;C&nbsp;</span></td>
                </tr>				
                <tr style="line-height:1.1;">
                    <td class="w3-right"><span class="w3-xxlarge" style="vertical-align: middle">${stats['D'].length}</span></td>
                    <td><span class="w3-tag w3-green w3-round-large" style="vertical-align: middle;line-height:1.5;">&nbsp;D&nbsp;</span></td>
                    <td><span>&nbsp;</span></td>
                    <td class="w3-right"><span class="w3-xxlarge" style="vertical-align: middle">${stats['E'].length}</span></td>
                    <td><span class="w3-tag w3-green w3-round-large" style="vertical-align: middle;line-height:1.5;">&nbsp;E&nbsp;</span></td>
                    <td><span>&nbsp;</span></td>
                    <td class="w3-right"><span class="w3-xxlarge" style="vertical-align: middle">${stats['G'].length}</span></td>
                    <td><span class="w3-tag w3-red w3-round-large" style="vertical-align: middle;line-height:1.5;">&nbsp;G&nbsp;</span></td>
                    <td></td><td></td><td></td>
                </tr>				
                </tbody></table>
                <span class="w3-small" style="display:block;line-height:1;">Taburan Gred Mata Pelajaran</span>
                </div>
                </div>
            </div>
            `
            // Let's do A first
            for (let grade in stats) {
                if (stats[grade].length == 0) {
                    continue
                }
                let color = 'purple'
                if (grade.charAt(0) == 'B' || grade.charAt(0) == 'C') {
                    color = 'blue'
                }
                structure += `
                <div id="grd0" class="w3-card w3-margin-bottom">
                    <header class="w3-${color} w3-container">
                        <h5 class="w3-center"><span class="w3-left">${grade}</span>${status[grade]}<span class="w3-right">${stats[grade].length}</span></h5>
                    </header>
                    <div class="w3-khaki">
                        <ul class="w3-ul">
                `
                console.log(stats)
                for (let i = 0; i < Object.keys(stats).length; i++) {
                    let x = stats[grade][i]
                    if (x == undefined) {
                        continue
                    }
                    structure += `<li>${stats[grade][i]}</li>`
                }
                structure += `
                        </ul>
                    </div>
                </div>
                `
            }
            structure += `
            
            `
            document.open()
            document.write(structure.replace(/undefined/g, ''))
            document.close()
        }
    )
}