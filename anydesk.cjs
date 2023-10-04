const values = `1790810468,1790810468,,;sl_controller@blujedis,435148955,,;sl_server@blujedis,868786719,,;276439855,276439855,,;kdk_server_room_admin@blujedis,202811850,,;sl_guardgate@blujedis,605021050,,;sl_hoa@blujedis,839544072,,;blu_spare_w10@blujedis,160984079,,;sl_silas_laptop_new@blujedis,297585955,,;kdk_karen@blujedis,769141971,,;kdk_jillnewell_new@blujedis,418544249,,;kdk_erik_sb@blujedis,690651139,,;658270070,658270070,,;kdk_deborah_spare@blujedis,728686234,,;sl_becky_laptop@blujedis,574871570,,;sl_bar@blujedis,557928052,,;kdk_carey@blujedis,595061698,,;sl_waitstation@blujedis,959460556,,;sl_patio@blujedis,115161102,,;592400943,592400943,,;kdk_netisa_laptop@blujedis,833419022,,;sl_frontdesk@blujedis,356847595,,;sl_fandb_old@blujedis,986119680,,;desktop-en69q7a@ad,113083751,kdk_karla_laptop,;win-oa3tqi8plak@ad,755111364,kdk_server@blujedis,;kdk_cheryl_new@blujedis,831296050,,;kdk_john@blujedis,188566519,,;kdk_kathy_conf2@blujedis,692157533,kdk_kathy@blujedis,;blu_carbon@blujedis,817459534,,;kdk_linda@blujedis,891716182,,;kdk_jennifer@blujedis,826941810,,;538482219,538482219,kdk_mydesk@blujedis,;sl_rick@blujedis,735474240,,;kdk_mary@blujedis,369250017,,;kdk_karla@blujedis,562436752,,;kdk_kathy_sb@blujedis,176264766,,;kdk_jeff_new@blujedis,331241684,,;kdk_server_old@blujedis,868084401,,;kdk_deborah_laptop@blujedis,511564183,,;kdk_sherry@blujedis,794627949,,;kdk_erik@blujedis,414509733,,;kdk_john_new@blujedis,180068344,,;kdk_cheryl@blujedis,142123202,,;kdk_netisa@blujedis,390534755,,;kdk_conference_main@blujedis,885093020,,;blu_windows@blujedis,743332380,,;163177377,163177377,glad_harrison@blujedis,;kdk_deborah@blujedis,173158574,,;desktop-dgq46gg@ad,742696685,kdk_john_sue@blujedis,;505967766,505967766,glad_marylynn@blujedis,;kdk_erik_laptop@blujedis,199970804,,;kdk_anne@blujedis,305242623,,;sl_golfshop@blujedis,233050694,,;sl_fandb@blujedis,215277350,,;537716701,537716701,537716701-Ashlyn,;blu_eljefelaptop@blujedis,633500467,,;sl_gm@blujedis,179703981,,;desktop-fpgtqnn@ad,183797695,,;kdk_tamara_laptop@blujedis,842217968,,;kdk_tamara@blujedis,729798820,,;desktopcarla@ad,385485875,kdk_karla_sb@blujedis,;sl_accounting01@blujedis,301676615,,;jeffdesktop-5@ad,938615599,kdk_jeff@blujedis,;blu_mimaki@blujedis,778984393,,;637454614,637454614,ashlyn-surface@blujedis,;626609550,626609550,sl-chef@blujedis,;elejefe-surface@ad,109796325,elejefe-surface@blujedis,;sl_server_old@blujedis,407216966,,;frontdesk-801@ad,317337257,sl_frontdesk@blujedis,;sl_rainbird@blujedis,671825903,,`;

const map = {};
const ordered = {};

values.split(';').forEach(row => {
  const cols = row.split(',');
  const [name, id] = cols;
  if (cols.length > 1) {
    map[name] = id;
  }
  else if (cols.length === 1) {
    map[id] = id;
  }
});

Object.keys(map).sort().forEach(key => {
  ordered[key] = map[key]
});

console.log(ordered);

