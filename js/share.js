
function kure_append_menu() {
    
    if ($('#button_delete_profilne').length == 1) {
        return;
    }
    
    var kure_menu =`
    <div class="button_delete_profilne" id="button_delete_profilne">SHARE</div>`;
    $('body').append(kure_menu);
    
    

    $("#button_delete_profilne").click(function () {
        
        //=====ispis ne terba da radi
        var prva_slika = $('.FFVAD')[0];
        var prva_slika_link = prva_slika.src;
        if (prva_slika_link == localStorage.getItem('xx')) {
            $('.button_delete_profilne').html("NE TREBA DA RADI").css("background-color", "#C75756");
        }
        //================
        
 
        go_to_my_profile()
    });

};
kure_append_menu_interval = setInterval(kure_append_menu, 1000);





function go_to_my_profile() {
    if($('.Szr5J.kIKUG.coreSpriteDesktopNavProfile').length == 1) {
    $('.Szr5J.kIKUG.coreSpriteDesktopNavProfile')[0].click();    
    console.log("go to my profile")
    //clearInterval(interval_gotomyprofil);
    setTimeout(provera_nove_slike,  2000);
    }
}
//var interval_gotomyprofil = setInterval(function () { go_to_my_profile() }, 500);


function provera_nove_slike() {

    function tajming_provere_nove_slike() {
        if( $('.eLAPa') &&  $('.oF4XW.sqdOP.L3NKy._4pI4F._8A5w5')) { //klasa za slike && dugme edit profile
        console.log("Pocinjemo!!!")
        clearInterval(intervalTajminga)
        
            var prva_slika = $('.FFVAD')[0]; //   <--------------------------------------------------------------
            var prva_slika_link = prva_slika.src;
            if (prva_slika_link == localStorage.getItem('xx')) {
                console.log("NE TREBA DA RADI")
                $('.button_delete_profilne').html("Delete photo - ON").css("background-color", "#C75756");
                //$('#kure_btn_3').html("NEMA NOVE SLIKE");  /// ????
                
                console.log("Nova:      ",prva_slika_link)
                console.log("Prethodna: ",localStorage.getItem('xx'))
            } else {
                console.log("TREBA DA RADI")
                console.log("prva ",prva_slika_link)
                console.log("pret ",localStorage.getItem('xx'))
                //setuje lokalnu promenljivu  ,brisanje: localStorage.removeItem('xx');
                localStorage.setItem("xx", prva_slika_link);
                //objavi_na_fb();
                otvori_sliku()
            }    
        
    
        }
    var intervalTajminga = setInterval(function () { provera_nove_slike() }, 200);    
    }
    
    
    var prva_slika = $('.FFVAD')[0]; //   <--------------------------------------------------------------
    var prva_slika_link = prva_slika.src;
    if (prva_slika_link == localStorage.getItem('xx')) {
        console.log("NE TREBA DA RADI")
        console.log("Nova:      ",prva_slika_link)
        console.log("Prethodna: ",localStorage.getItem('xx'))
    } else {
        console.log("TREBA DA RADI")
        console.log("prva ",prva_slika_link)
        console.log("pret ",localStorage.getItem('xx'))
        //setuje lokalnu promenljivu  ,brisanje: localStorage.removeItem('xx');
        localStorage.setItem("xx", prva_slika_link);
        //objavi_na_fb();
        otvori_sliku()
    }
   
}
  


function otvori_sliku() { 
    var prva_slika = $('.FFVAD')[0];  //   <--------------------------------------------------------------
    if (prva_slika.localName == "img") {
        console.log("Kliknuto na prvu sliku.");
        prva_slika.click();
        
        //******************
        function pronadji_klikMeni() {
            eLement = $(".glyphsSpriteMore_horizontal__outline__24__grey_9.u-__7");
            if (eLement.length == 1) {
                klikMeni();
                clearInterval(interval_klikMeni);
            }
            }
            var interval_klikMeni = setInterval(function () { pronadji_klikMeni() }, 200);
        //********************
        
        } else {
          console.log("NE MOZE da klikne na prvu sliku.");  
    }
}

function klikMeni() {
    eLement = $(".glyphsSpriteMore_horizontal__outline__24__grey_9.u-__7");
    if (eLement.length == 1) {
        eLement.click()
        console.log("Kliknuto na Menu.");
        
        //********************      
        function pronadji_klik_share() {

            if ($(".mt3GC :button")) {
                klik_share();
                clearInterval(interval_klik_share);
            }
            }
        var interval_klik_share = setInterval(function () { pronadji_klik_share() }, 200);
        //********************        

    } else {
        console.log("NE MOZE da klikne na Menu.")
    }
}

function klik_share() {
    var koji_je_eLement_share = $(".mt3GC :button")
    for (var i = 0; i < koji_je_eLement_share.length; i++) { // trazim index (nije uvek isti)
        if ($(".mt3GC :button")[i].innerText == "Share") {
            console.log("KLIKNUTO share  index ",i)
            var eLement_share = koji_je_eLement_share[i];
            eLement_share.click()
            console.log(eLement_share)
            break;
        }
    }
            //********************      
            function pronadji_klik_share_to_fb() {
                eLement_share_to_fb = $('._7UhW9.xLCgt.qyrsm.KV-D4.uL8Hv')[0]
                if (eLement_share_to_fb.innerText == "Share to Facebook") {
                    klik_share_to_fb();
                    clearInterval(interval_klik_share_to_fb);
                }
            }
            var interval_klik_share_to_fb = setInterval(function () {
                pronadji_klik_share_to_fb()
            }, 200);
            //******************** 
            
            
            
        
        
    

   
   
}

function klik_share_to_fb() {
    eLement_share_to_fb = $('._7UhW9.xLCgt.qyrsm.KV-D4.uL8Hv')[0]
    if (eLement_share_to_fb.innerText == "Share to Facebook") {
        eLement_share_to_fb.click()
        console.log("Kliknuto na Share to Facebook.");
    } else {
        console.log("NE MOZE da klikne na Share to Facebook.")
    }
}

//open newtab link fb
if (window.location.href.includes("sharer")) {
    console.log("URL spreman - share sa insta na fb");

	//$('._42ft._4jy0.layerConfirm._51_n.autofocus._4jy3._4jy1.selected._51sy')
    eLement_objavi_na_fb = $('.autofocus')
    if (eLement_objavi_na_fb.length == 1) {
        eLement_objavi_na_fb.click()
        console.log("Kliknuto na Objavi na fejsbuku.");
    } else {
        console.log("NE MOZE da klikne na Objavi na fejsbuku.")
    }
}





