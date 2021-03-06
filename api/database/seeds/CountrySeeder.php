<?php

use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        DB::table('countries')->truncate();
        DB::statement("INSERT INTO `countries` (`capital`, `citizenship`, `country_code`, `currency`, `currency_code`, `currency_sub_unit`, `full_name`, `iso_3166_2`, `iso_3166_3`, `name`, `region_code`, `sub_region_code`, `eea`)
VALUES
    ('Kabul','Afghan','004','afghani','AFN','pul','Islamic Republic of Afghanistan','AF','AFG','Afghanistan','142','034',0),
    ('Tirana','Albanian','008','lek','ALL','(qindar (pl. qindarka))','Republic of Albania','AL','ALB','Albania','150','039',0),
    ('Antartica','of Antartica','010','','','','Antarctica','AQ','ATA','Antarctica','','',0),
    ('Algiers','Algerian','012','Algerian dinar','DZD','centime','People’s Democratic Republic of Algeria','DZ','DZA','Algeria','002','015',0),
    ('Pago Pago','American Samoan','016','US dollar','USD','cent','Territory of American','AS','ASM','American Samoa','009','061',0),
    ('Andorra la Vella','Andorran','020','euro','EUR','cent','Principality of Andorra','AD','AND','Andorra','150','039',0),
    ('Luanda','Angolan','024','kwanza','AOA','cêntimo','Republic of Angola','AO','AGO','Angola','002','017',0),
    ('St John’s','of Antigua and Barbuda','028','East Caribbean dollar','XCD','cent','Antigua and Barbuda','AG','ATG','Antigua and Barbuda','019','029',0),
    ('Baku','Azerbaijani','031','Azerbaijani manat','AZN','kepik (inv.)','Republic of Azerbaijan','AZ','AZE','Azerbaijan','142','145',0),
    ('Buenos Aires','Argentinian','032','Argentine peso','ARS','centavo','Argentine Republic','AR','ARG','Argentina','019','005',0),
    ('Canberra','Australian','036','Australian dollar','AUD','cent','Commonwealth of Australia','AU','AUS','Australia','009','053',0),
    ('Vienna','Austrian','040','euro','EUR','cent','Republic of Austria','AT','AUT','Austria','150','155',1),
    ('Nassau','Bahamian','044','Bahamian dollar','BSD','cent','Commonwealth of the Bahamas','BS','BHS','Bahamas','019','029',0),
    ('Manama','Bahraini','048','Bahraini dinar','BHD','fils (inv.)','Kingdom of Bahrain','BH','BHR','Bahrain','142','145',0),
    ('Dhaka','Bangladeshi','050','taka (inv.)','BDT','poisha (inv.)','People’s Republic of Bangladesh','BD','BGD','Bangladesh','142','034',0),
    ('Yerevan','Armenian','051','dram (inv.)','AMD','luma','Republic of Armenia','AM','ARM','Armenia','142','145',0),
    ('Bridgetown','Barbadian','052','Barbados dollar','BBD','cent','Barbados','BB','BRB','Barbados','019','029',0),
    ('Brussels','Belgian','056','euro','EUR','cent','Kingdom of Belgium','BE','BEL','Belgium','150','155',1),
    ('Hamilton','Bermudian','060','Bermuda dollar','BMD','cent','Bermuda','BM','BMU','Bermuda','019','021',0),
    ('Thimphu','Bhutanese','064','ngultrum (inv.)','BTN','chhetrum (inv.)','Kingdom of Bhutan','BT','BTN','Bhutan','142','034',0),
    ('Sucre (BO1)','Bolivian','068','boliviano','BOB','centavo','Plurinational State of Bolivia','BO','BOL','Bolivia, Plurinational State of','019','005',0),
    ('Sarajevo','of Bosnia and Herzegovina','070','convertible mark','BAM','fening','Bosnia and Herzegovina','BA','BIH','Bosnia and Herzegovina','150','039',0),
    ('Gaborone','Botswanan','072','pula (inv.)','BWP','thebe (inv.)','Republic of Botswana','BW','BWA','Botswana','002','018',0),
    ('Bouvet island','of Bouvet island','074','','','','Bouvet Island','BV','BVT','Bouvet Island','','',0),
    ('Brasilia','Brazilian','076','real (pl. reais)','BRL','centavo','Federative Republic of Brazil','BR','BRA','Brazil','019','005',0),
    ('Belmopan','Belizean','084','Belize dollar','BZD','cent','Belize','BZ','BLZ','Belize','019','013',0),
    ('Diego Garcia','Changosian','086','US dollar','USD','cent','British Indian Ocean Territory','IO','IOT','British Indian Ocean Territory','','',0),
    ('Honiara','Solomon Islander','090','Solomon Islands dollar','SBD','cent','Solomon Islands','SB','SLB','Solomon Islands','009','054',0),
    ('Road Town','British Virgin Islander;','092','US dollar','USD','cent','British Virgin Islands','VG','VGB','Virgin Islands, British','019','029',0),
    ('Bandar Seri Begawan','Bruneian','096','Brunei dollar','BND','sen (inv.)','Brunei Darussalam','BN','BRN','Brunei Darussalam','142','035',0),
    ('Sofia','Bulgarian','100','lev (pl. leva)','BGN','stotinka','Republic of Bulgaria','BG','BGR','Bulgaria','150','151',1),
    ('Yangon','Burmese','104','kyat','MMK','pya','Union of Myanmar/','MM','MMR','Myanmar','142','035',0),
    ('Bujumbura','Burundian','108','Burundi franc','BIF','centime','Republic of Burundi','BI','BDI','Burundi','002','014',0),
    ('Minsk','Belarusian','112','Belarusian rouble','BYR','kopek','Republic of Belarus','BY','BLR','Belarus','150','151',0),
    ('Phnom Penh','Cambodian','116','riel','KHR','sen (inv.)','Kingdom of Cambodia','KH','KHM','Cambodia','142','035',0),
    ('Yaoundé','Cameroonian','120','CFA franc (BEAC)','XAF','centime','Republic of Cameroon','CM','CMR','Cameroon','002','017',0),
    ('Ottawa','Canadian','124','Canadian dollar','CAD','cent','Canada','CA','CAN','Canada','019','021',0),
    ('Praia','Cape Verdean','132','Cape Verde escudo','CVE','centavo','Republic of Cape Verde','CV','CPV','Cape Verde','002','011',0),
    ('George Town','Caymanian','136','Cayman Islands dollar','KYD','cent','Cayman Islands','KY','CYM','Cayman Islands','019','029',0),
    ('Bangui','Central African','140','CFA franc (BEAC)','XAF','centime','Central African Republic','CF','CAF','Central African Republic','002','017',0),
    ('Colombo','Sri Lankan','144','Sri Lankan rupee','LKR','cent','Democratic Socialist Republic of Sri Lanka','LK','LKA','Sri Lanka','142','034',0),
    ('N’Djamena','Chadian','148','CFA franc (BEAC)','XAF','centime','Republic of Chad','TD','TCD','Chad','002','017',0),
    ('Santiago','Chilean','152','Chilean peso','CLP','centavo','Republic of Chile','CL','CHL','Chile','019','005',0),
    ('Beijing','Chinese','156','renminbi-yuan (inv.)','CNY','jiao (10)','People’s Republic of China','CN','CHN','China','142','030',0),
    ('Taipei','Taiwanese','158','new Taiwan dollar','TWD','fen (inv.)','Republic of China, Taiwan (TW1)','TW','TWN','Taiwan, Province of China','142','030',0),
    ('Flying Fish Cove','Christmas Islander','162','Australian dollar','AUD','cent','Christmas Island Territory','CX','CXR','Christmas Island','','',0),
    ('Bantam','Cocos Islander','166','Australian dollar','AUD','cent','Territory of Cocos (Keeling) Islands','CC','CCK','Cocos (Keeling) Islands','','',0),
    ('Santa Fe de Bogotá','Colombian','170','Colombian peso','COP','centavo','Republic of Colombia','CO','COL','Colombia','019','005',0),
    ('Moroni','Comorian','174','Comorian franc','KMF','','Union of the Comoros','KM','COM','Comoros','002','014',0),
    ('Mamoudzou','Mahorais','175','euro','EUR','cent','Departmental Collectivity of Mayotte','YT','MYT','Mayotte','002','014',0),
    ('Brazzaville','Congolese','178','CFA franc (BEAC)','XAF','centime','Republic of the Congo','CG','COG','Congo','002','017',0),
    ('Kinshasa','Congolese','180','Congolese franc','CDF','centime','Democratic Republic of the Congo','CD','COD','Congo, the Democratic Republic of the','002','017',0),
    ('Avarua','Cook Islander','184','New Zealand dollar','NZD','cent','Cook Islands','CK','COK','Cook Islands','009','061',0),
    ('San José','Costa Rican','188','Costa Rican colón (pl. colones)','CRC','céntimo','Republic of Costa Rica','CR','CRI','Costa Rica','019','013',0),
    ('Zagreb','Croatian','191','kuna (inv.)','HRK','lipa (inv.)','Republic of Croatia','HR','HRV','Croatia','150','039',1),
    ('Havana','Cuban','192','Cuban peso','CUP','centavo','Republic of Cuba','CU','CUB','Cuba','019','029',0),
    ('Nicosia','Cypriot','196','euro','EUR','cent','Republic of Cyprus','CY','CYP','Cyprus','142','145',1),
    ('Prague','Czech','203','Czech koruna (pl. koruny)','CZK','halér','Czech Republic','CZ','CZE','Czech Republic','150','151',1),
    ('Porto Novo (BJ1)','Beninese','204','CFA franc (BCEAO)','XOF','centime','Republic of Benin','BJ','BEN','Benin','002','011',0),
    ('Copenhagen','Danish','208','Danish krone','DKK','øre (inv.)','Kingdom of Denmark','DK','DNK','Denmark','150','154',1),
    ('Roseau','Dominican','212','East Caribbean dollar','XCD','cent','Commonwealth of Dominica','DM','DMA','Dominica','019','029',0),
    ('Santo Domingo','Dominican','214','Dominican peso','DOP','centavo','Dominican Republic','DO','DOM','Dominican Republic','019','029',0),
    ('Quito','Ecuadorian','218','US dollar','USD','cent','Republic of Ecuador','EC','ECU','Ecuador','019','005',0),
    ('San Salvador','Salvadoran','222','Salvadorian colón (pl. colones)','SVC','centavo','Republic of El Salvador','SV','SLV','El Salvador','019','013',0),
    ('Malabo','Equatorial Guinean','226','CFA franc (BEAC)','XAF','centime','Republic of Equatorial Guinea','GQ','GNQ','Equatorial Guinea','002','017',0),
    ('Addis Ababa','Ethiopian','231','birr (inv.)','ETB','cent','Federal Democratic Republic of Ethiopia','ET','ETH','Ethiopia','002','014',0),
    ('Asmara','Eritrean','232','nakfa','ERN','cent','State of Eritrea','ER','ERI','Eritrea','002','014',0),
    ('Tallinn','Estonian','233','euro','EUR','cent','Republic of Estonia','EE','EST','Estonia','150','154',1),
    ('Tórshavn','Faeroese','234','Danish krone','DKK','øre (inv.)','Faeroe Islands','FO','FRO','Faroe Islands','150','154',0),
    ('Stanley','Falkland Islander','238','Falkland Islands pound','FKP','new penny','Falkland Islands','FK','FLK','Falkland Islands (Malvinas)','019','005',0),
    ('King Edward Point (Grytviken)','of South Georgia and the South Sandwich Islands','239','','','','South Georgia and the South Sandwich Islands','GS','SGS','South Georgia and the South Sandwich Islands','','',0),
    ('Suva','Fijian','242','Fiji dollar','FJD','cent','Republic of Fiji','FJ','FJI','Fiji','009','054',0),
    ('Helsinki','Finnish','246','euro','EUR','cent','Republic of Finland','FI','FIN','Finland','150','154',1),
    ('Mariehamn','Åland Islander','248','euro','EUR','cent','Åland Islands','AX','ALA','Åland Islands','150','154',0),
    ('Paris','French','250','euro','EUR','cent','French Republic','FR','FRA','France','150','155',1),
    ('Cayenne','Guianese','254','euro','EUR','cent','French Guiana','GF','GUF','French Guiana','019','005',0),
    ('Papeete','Polynesian','258','CFP franc','XPF','centime','French Polynesia','PF','PYF','French Polynesia','009','061',0),
    ('Port-aux-Francais','of French Southern and Antarctic Lands','260','euro','EUR','cent','French Southern and Antarctic Lands','TF','ATF','French Southern Territories','','',0),
    ('Djibouti','Djiboutian','262','Djibouti franc','DJF','','Republic of Djibouti','DJ','DJI','Djibouti','002','014',0),
    ('Libreville','Gabonese','266','CFA franc (BEAC)','XAF','centime','Gabonese Republic','GA','GAB','Gabon','002','017',0),
    ('Tbilisi','Georgian','268','lari','GEL','tetri (inv.)','Georgia','GE','GEO','Georgia','142','145',0),
    ('Banjul','Gambian','270','dalasi (inv.)','GMD','butut','Republic of the Gambia','GM','GMB','Gambia','002','011',0),
    (NULL,'Palisitnean','275',NULL,NULL,NULL,NULL,'PS','PSE','Palestinian Territory, Occupied','142','145',0),
    ('Berlin','German','276','euro','EUR','cent','Federal Republic of Germany','DE','DEU','Germany','150','155',1),
    ('Accra','Ghanaian','288','Ghana cedi','GHS','pesewa','Republic of Ghana','GH','GHA','Ghana','002','011',0),
    ('Gibraltar','Gibraltarian','292','Gibraltar pound','GIP','penny','Gibraltar','GI','GIB','Gibraltar','150','039',0),
    ('Tarawa','Kiribatian','296','Australian dollar','AUD','cent','Republic of Kiribati','KI','KIR','Kiribati','009','057',0),
    ('Athens','Greek','300','euro','EUR','cent','Hellenic Republic','GR','GRC','Greece','150','039',1),
    ('Nuuk','Greenlander','304','Danish krone','DKK','øre (inv.)','Greenland','GL','GRL','Greenland','019','021',0),
    ('St George’s','Grenadian','308','East Caribbean dollar','XCD','cent','Grenada','GD','GRD','Grenada','019','029',0),
    ('Basse Terre','Guadeloupean','312','euro','EUR ','cent','Guadeloupe','GP','GLP','Guadeloupe','019','029',0),
    ('Agaña (Hagåtña)','Guamanian','316','US dollar','USD','cent','Territory of Guam','GU','GUM','Guam','009','057',0),
    ('Guatemala City','Guatemalan','320','quetzal (pl. quetzales)','GTQ','centavo','Republic of Guatemala','GT','GTM','Guatemala','019','013',0),
    ('Conakry','Guinean','324','Guinean franc','GNF','','Republic of Guinea','GN','GIN','Guinea','002','011',0),
    ('Georgetown','Guyanese','328','Guyana dollar','GYD','cent','Cooperative Republic of Guyana','GY','GUY','Guyana','019','005',0),
    ('Port-au-Prince','Haitian','332','gourde','HTG','centime','Republic of Haiti','HT','HTI','Haiti','019','029',0),
    ('Territory of Heard Island and McDonald Islands','of Territory of Heard Island and McDonald Islands','334','','','','Territory of Heard Island and McDonald Islands','HM','HMD','Heard Island and McDonald Islands','','',0),
    ('Vatican City','of the Holy See/of the Vatican','336','euro','EUR','cent','the Holy See/ Vatican City State','VA','VAT','Holy See (Vatican City State)','150','039',0),
    ('Tegucigalpa','Honduran','340','lempira','HNL','centavo','Republic of Honduras','HN','HND','Honduras','019','013',0),
    ('(HK3)','Hong Kong Chinese','344','Hong Kong dollar','HKD','cent','Hong Kong Special Administrative Region of the People’s Republic of China (HK2)','HK','HKG','Hong Kong','142','030',0),
    ('Budapest','Hungarian','348','forint (inv.)','HUF','(fillér (inv.))','Republic of Hungary','HU','HUN','Hungary','150','151',1),
    ('Reykjavik','Icelander','352','króna (pl. krónur)','ISK','','Republic of Iceland','IS','ISL','Iceland','150','154',1),
    ('New Delhi','Indian','356','Indian rupee','INR','paisa','Republic of India','IN','IND','India','142','034',0),
    ('Jakarta','Indonesian','360','Indonesian rupiah (inv.)','IDR','sen (inv.)','Republic of Indonesia','ID','IDN','Indonesia','142','035',0),
    ('Tehran','Iranian','364','Iranian rial','IRR','(dinar) (IR1)','Islamic Republic of Iran','IR','IRN','Iran, Islamic Republic of','142','034',0),
    ('Baghdad','Iraqi','368','Iraqi dinar','IQD','fils (inv.)','Republic of Iraq','IQ','IRQ','Iraq','142','145',0),
    ('Dublin','Irish','372','euro','EUR','cent','Ireland (IE1)','IE','IRL','Ireland','150','154',1),
    ('(IL1)','Israeli','376','shekel','ILS','agora','State of Israel','IL','ISR','Israel','142','145',0),
    ('Rome','Italian','380','euro','EUR','cent','Italian Republic','IT','ITA','Italy','150','039',1),
    ('Yamoussoukro (CI1)','Ivorian','384','CFA franc (BCEAO)','XOF','centime','Republic of Côte d’Ivoire','CI','CIV','Côte d\'Ivoire','002','011',0),
    ('Kingston','Jamaican','388','Jamaica dollar','JMD','cent','Jamaica','JM','JAM','Jamaica','019','029',0),
    ('Tokyo','Japanese','392','yen (inv.)','JPY','(sen (inv.)) (JP1)','Japan','JP','JPN','Japan','142','030',0),
    ('Astana','Kazakh','398','tenge (inv.)','KZT','tiyn','Republic of Kazakhstan','KZ','KAZ','Kazakhstan','142','143',0),
    ('Amman','Jordanian','400','Jordanian dinar','JOD','100 qirsh','Hashemite Kingdom of Jordan','JO','JOR','Jordan','142','145',0),
    ('Nairobi','Kenyan','404','Kenyan shilling','KES','cent','Republic of Kenya','KE','KEN','Kenya','002','014',0),
    ('Pyongyang','North Korean','408','North Korean won (inv.)','KPW','chun (inv.)','Democratic People’s Republic of Korea','KP','PRK','Korea, Democratic People\'s Republic of','142','030',0),
    ('Seoul','South Korean','410','South Korean won (inv.)','KRW','(chun (inv.))','Republic of Korea','KR','KOR','Korea, Republic of','142','030',0),
    ('Kuwait City','Kuwaiti','414','Kuwaiti dinar','KWD','fils (inv.)','State of Kuwait','KW','KWT','Kuwait','142','145',0),
    ('Bishkek','Kyrgyz','417','som','KGS','tyiyn','Kyrgyz Republic','KG','KGZ','Kyrgyzstan','142','143',0),
    ('Vientiane','Lao','418','kip (inv.)','LAK','(at (inv.))','Lao People’s Democratic Republic','LA','LAO','Lao People\'s Democratic Republic','142','035',0),
    ('Beirut','Lebanese','422','Lebanese pound','LBP','(piastre)','Lebanese Republic','LB','LBN','Lebanon','142','145',0),
    ('Maseru','Basotho','426','loti (pl. maloti)','LSL','sente','Kingdom of Lesotho','LS','LSO','Lesotho','002','018',0),
    ('Riga','Latvian','428','lats (pl. lati)','LVL','santims','Republic of Latvia','LV','LVA','Latvia','150','154',1),
    ('Monrovia','Liberian','430','Liberian dollar','LRD','cent','Republic of Liberia','LR','LBR','Liberia','002','011',0),
    ('Tripoli','Libyan','434','Libyan dinar','LYD','dirham','Socialist People’s Libyan Arab Jamahiriya','LY','LBY','Libya','002','015',0),
    ('Vaduz','Liechtensteiner','438','Swiss franc','CHF','centime','Principality of Liechtenstein','LI','LIE','Liechtenstein','150','155',1),
    ('Vilnius','Lithuanian','440','litas (pl. litai)','LTL','centas','Republic of Lithuania','LT','LTU','Lithuania','150','154',1),
    ('Luxembourg','Luxembourger','442','euro','EUR','cent','Grand Duchy of Luxembourg','LU','LUX','Luxembourg','150','155',1),
    ('Macao (MO3)','Macanese','446','pataca','MOP','avo','Macao Special Administrative Region of the People’s Republic of China (MO2)','MO','MAC','Macao','142','030',0),
    ('Antananarivo','Malagasy','450','ariary','MGA','iraimbilanja (inv.)','Republic of Madagascar','MG','MDG','Madagascar','002','014',0),
    ('Lilongwe','Malawian','454','Malawian kwacha (inv.)','MWK','tambala (inv.)','Republic of Malawi','MW','MWI','Malawi','002','014',0),
    ('Kuala Lumpur (MY1)','Malaysian','458','ringgit (inv.)','MYR','sen (inv.)','Malaysia','MY','MYS','Malaysia','142','035',0),
    ('Malé','Maldivian','462','rufiyaa','MVR','laari (inv.)','Republic of Maldives','MV','MDV','Maldives','142','034',0),
    ('Bamako','Malian','466','CFA franc (BCEAO)','XOF','centime','Republic of Mali','ML','MLI','Mali','002','011',0),
    ('Valletta','Maltese','470','euro','EUR','cent','Republic of Malta','MT','MLT','Malta','150','039',1),
    ('Fort-de-France','Martinican','474','euro','EUR','cent','Martinique','MQ','MTQ','Martinique','019','029',0),
    ('Nouakchott','Mauritanian','478','ouguiya','MRO','khoum','Islamic Republic of Mauritania','MR','MRT','Mauritania','002','011',0),
    ('Port Louis','Mauritian','480','Mauritian rupee','MUR','cent','Republic of Mauritius','MU','MUS','Mauritius','002','014',0),
    ('Mexico City','Mexican','484','Mexican peso','MXN','centavo','United Mexican States','MX','MEX','Mexico','019','013',0),
    ('Monaco','Monegasque','492','euro','EUR','cent','Principality of Monaco','MC','MCO','Monaco','150','155',0),
    ('Ulan Bator','Mongolian','496','tugrik','MNT','möngö (inv.)','Mongolia','MN','MNG','Mongolia','142','030',0),
    ('Chisinau','Moldovan','498','Moldovan leu (pl. lei)','MDL','ban','Republic of Moldova','MD','MDA','Moldova, Republic of','150','151',0),
    ('Podgorica','Montenegrin','499','euro','EUR','cent','Montenegro','ME','MNE','Montenegro','150','039',0),
    ('Plymouth (MS2)','Montserratian','500','East Caribbean dollar','XCD','cent','Montserrat','MS','MSR','Montserrat','019','029',0),
    ('Rabat','Moroccan','504','Moroccan dirham','MAD','centime','Kingdom of Morocco','MA','MAR','Morocco','002','015',0),
    ('Maputo','Mozambican','508','metical','MZN','centavo','Republic of Mozambique','MZ','MOZ','Mozambique','002','014',0),
    ('Muscat','Omani','512','Omani rial','OMR','baiza','Sultanate of Oman','OM','OMN','Oman','142','145',0),
    ('Windhoek','Namibian','516','Namibian dollar','NAD','cent','Republic of Namibia','NA','NAM','Namibia','002','018',0),
    ('Yaren','Nauruan','520','Australian dollar','AUD','cent','Republic of Nauru','NR','NRU','Nauru','009','057',0),
    ('Kathmandu','Nepalese','524','Nepalese rupee','NPR','paisa (inv.)','Nepal','NP','NPL','Nepal','142','034',0),
    ('Amsterdam (NL2)','Dutch','528','euro','EUR','cent','Kingdom of the Netherlands','NL','NLD','Netherlands','150','155',1),
    ('Willemstad','Curaçaoan','531','Netherlands Antillean guilder (CW1)','ANG','cent','Curaçao','CW','CUW','Curaçao','019','029',0),
    ('Oranjestad','Aruban','533','Aruban guilder','AWG','cent','Aruba','AW','ABW','Aruba','019','029',0),
    ('Philipsburg','Sint Maartener','534','Netherlands Antillean guilder (SX1)','ANG','cent','Sint Maarten','SX','SXM','Sint Maarten (Dutch part)','019','029',0),
    (NULL,'of Bonaire, Sint Eustatius and Saba','535','US dollar','USD','cent',NULL,'BQ','BES','Bonaire, Sint Eustatius and Saba','019','029',0),
    ('Nouméa','New Caledonian','540','CFP franc','XPF','centime','New Caledonia','NC','NCL','New Caledonia','009','054',0),
    ('Port Vila','Vanuatuan','548','vatu (inv.)','VUV','','Republic of Vanuatu','VU','VUT','Vanuatu','009','054',0),
    ('Wellington','New Zealander','554','New Zealand dollar','NZD','cent','New Zealand','NZ','NZL','New Zealand','009','053',0),
    ('Managua','Nicaraguan','558','córdoba oro','NIO','centavo','Republic of Nicaragua','NI','NIC','Nicaragua','019','013',0),
    ('Niamey','Nigerien','562','CFA franc (BCEAO)','XOF','centime','Republic of Niger','NE','NER','Niger','002','011',0),
    ('Abuja','Nigerian','566','naira (inv.)','NGN','kobo (inv.)','Federal Republic of Nigeria','NG','NGA','Nigeria','002','011',0),
    ('Alofi','Niuean','570','New Zealand dollar','NZD','cent','Niue','NU','NIU','Niue','009','061',0),
    ('Kingston','Norfolk Islander','574','Australian dollar','AUD','cent','Territory of Norfolk Island','NF','NFK','Norfolk Island','009','053',0),
    ('Oslo','Norwegian','578','Norwegian krone (pl. kroner)','NOK','øre (inv.)','Kingdom of Norway','NO','NOR','Norway','150','154',1),
    ('Saipan','Northern Mariana Islander','580','US dollar','USD','cent','Commonwealth of the Northern Mariana Islands','MP','MNP','Northern Mariana Islands','009','057',0),
    ('United States Minor Outlying Islands','of United States Minor Outlying Islands','581','US dollar','USD','cent','United States Minor Outlying Islands','UM','UMI','United States Minor Outlying Islands','','',0),
    ('Palikir','Micronesian','583','US dollar','USD','cent','Federated States of Micronesia','FM','FSM','Micronesia, Federated States of','009','057',0),
    ('Majuro','Marshallese','584','US dollar','USD','cent','Republic of the Marshall Islands','MH','MHL','Marshall Islands','009','057',0),
    ('Melekeok','Palauan','585','US dollar','USD','cent','Republic of Palau','PW','PLW','Palau','009','057',0),
    ('Islamabad','Pakistani','586','Pakistani rupee','PKR','paisa','Islamic Republic of Pakistan','PK','PAK','Pakistan','142','034',0),
    ('Panama City','Panamanian','591','balboa','PAB','centésimo','Republic of Panama','PA','PAN','Panama','019','013',0),
    ('Port Moresby','Papua New Guinean','598','kina (inv.)','PGK','toea (inv.)','Independent State of Papua New Guinea','PG','PNG','Papua New Guinea','009','054',0),
    ('Asunción','Paraguayan','600','guaraní','PYG','céntimo','Republic of Paraguay','PY','PRY','Paraguay','019','005',0),
    ('Lima','Peruvian','604','new sol','PEN','céntimo','Republic of Peru','PE','PER','Peru','019','005',0),
    ('Manila','Filipino','608','Philippine peso','PHP','centavo','Republic of the Philippines','PH','PHL','Philippines','142','035',0),
    ('Adamstown','Pitcairner','612','New Zealand dollar','NZD','cent','Pitcairn Islands','PN','PCN','Pitcairn','009','061',0),
    ('Warsaw','Polish','616','zloty','PLN','grosz (pl. groszy)','Republic of Poland','PL','POL','Poland','150','151',1),
    ('Lisbon','Portuguese','620','euro','EUR','cent','Portuguese Republic','PT','PRT','Portugal','150','039',1),
    ('Bissau','Guinea-Bissau national','624','CFA franc (BCEAO)','XOF','centime','Republic of Guinea-Bissau','GW','GNB','Guinea-Bissau','002','011',0),
    ('Dili','East Timorese','626','US dollar','USD','cent','Democratic Republic of East Timor','TL','TLS','Timor-Leste','142','035',0),
    ('San Juan','Puerto Rican','630','US dollar','USD','cent','Commonwealth of Puerto Rico','PR','PRI','Puerto Rico','019','029',0),
    ('Doha','Qatari','634','Qatari riyal','QAR','dirham','State of Qatar','QA','QAT','Qatar','142','145',0),
    ('Saint-Denis','Reunionese','638','euro','EUR','cent','Réunion','RE','REU','Réunion','002','014',0),
    ('Bucharest','Romanian','642','Romanian leu (pl. lei)','RON','ban (pl. bani)','Romania','RO','ROU','Romania','150','151',1),
    ('Moscow','Russian','643','Russian rouble','RUB','kopek','Russian Federation','RU','RUS','Russian Federation','150','151',0),
    ('Kigali','Rwandan; Rwandese','646','Rwandese franc','RWF','centime','Republic of Rwanda','RW','RWA','Rwanda','002','014',0),
    ('Gustavia','of Saint Barthélemy','652','euro','EUR','cent','Collectivity of Saint Barthélemy','BL','BLM','Saint Barthélemy','019','029',0),
    ('Jamestown','Saint Helenian','654','Saint Helena pound','SHP','penny','Saint Helena, Ascension and Tristan da Cunha','SH','SHN','Saint Helena, Ascension and Tristan da Cunha','002','011',0),
    ('Basseterre','Kittsian; Nevisian','659','East Caribbean dollar','XCD','cent','Federation of Saint Kitts and Nevis','KN','KNA','Saint Kitts and Nevis','019','029',0),
    ('The Valley','Anguillan','660','East Caribbean dollar','XCD','cent','Anguilla','AI','AIA','Anguilla','019','029',0),
    ('Castries','Saint Lucian','662','East Caribbean dollar','XCD','cent','Saint Lucia','LC','LCA','Saint Lucia','019','029',0),
    ('Marigot','of Saint Martin','663','euro','EUR','cent','Collectivity of Saint Martin','MF','MAF','Saint Martin (French part)','019','029',0),
    ('Saint-Pierre','St-Pierrais; Miquelonnais','666','euro','EUR','cent','Territorial Collectivity of Saint Pierre and Miquelon','PM','SPM','Saint Pierre and Miquelon','019','021',0),
    ('Kingstown','Vincentian','670','East Caribbean dollar','XCD','cent','Saint Vincent and the Grenadines','VC','VCT','Saint Vincent and the Grenadines','019','029',0),
    ('San Marino','San Marinese','674','euro','EUR ','cent','Republic of San Marino','SM','SMR','San Marino','150','039',0),
    ('São Tomé','São Toméan','678','dobra','STD','centavo','Democratic Republic of São Tomé and Príncipe','ST','STP','Sao Tome and Principe','002','017',0),
    ('Riyadh','Saudi Arabian','682','riyal','SAR','halala','Kingdom of Saudi Arabia','SA','SAU','Saudi Arabia','142','145',0),
    ('Dakar','Senegalese','686','CFA franc (BCEAO)','XOF','centime','Republic of Senegal','SN','SEN','Senegal','002','011',0),
    ('Belgrade','Serb','688','Serbian dinar','RSD','para (inv.)','Republic of Serbia','RS','SRB','Serbia','150','039',0),
    ('Victoria','Seychellois','690','Seychelles rupee','SCR','cent','Republic of Seychelles','SC','SYC','Seychelles','002','014',0),
    ('Freetown','Sierra Leonean','694','leone','SLL','cent','Republic of Sierra Leone','SL','SLE','Sierra Leone','002','011',0),
    ('Singapore','Singaporean','702','Singapore dollar','SGD','cent','Republic of Singapore','SG','SGP','Singapore','142','035',0),
    ('Bratislava','Slovak','703','euro','EUR','cent','Slovak Republic','SK','SVK','Slovakia','150','151',1),
    ('Hanoi','Vietnamese','704','dong','VND','(10 hào','Socialist Republic of Vietnam','VN','VNM','Viet Nam','142','035',0),
    ('Ljubljana','Slovene','705','euro','EUR','cent','Republic of Slovenia','SI','SVN','Slovenia','150','039',1),
    ('Mogadishu','Somali','706','Somali shilling','SOS','cent','Somali Republic','SO','SOM','Somalia','002','014',0),
    ('Pretoria (ZA1)','South African','710','rand','ZAR','cent','Republic of South Africa','ZA','ZAF','South Africa','002','018',0),
    ('Harare','Zimbabwean','716','Zimbabwe dollar (ZW1)','ZWL','cent','Republic of Zimbabwe','ZW','ZWE','Zimbabwe','002','014',0),
    ('Madrid','Spaniard','724','euro','EUR','cent','Kingdom of Spain','ES','ESP','Spain','150','039',1),
    ('Juba','South Sudanese','728','South Sudanese pound','SSP','piaster','Republic of South Sudan','SS','SSD','South Sudan','002','015',0),
    ('Khartoum','Sudanese','729','Sudanese pound','SDG','piastre','Republic of the Sudan','SD','SDN','Sudan','002','015',0),
    ('Al aaiun','Sahrawi','732','Moroccan dirham','MAD','centime','Western Sahara','EH','ESH','Western Sahara','002','015',0),
    ('Paramaribo','Surinamese','740','Surinamese dollar','SRD','cent','Republic of Suriname','SR','SUR','Suriname','019','005',0),
    ('Longyearbyen','of Svalbard','744','Norwegian krone (pl. kroner)','NOK','øre (inv.)','Svalbard and Jan Mayen','SJ','SJM','Svalbard and Jan Mayen','150','154',0),
    ('Mbabane','Swazi','748','lilangeni','SZL','cent','Kingdom of Swaziland','SZ','SWZ','Swaziland','002','018',0),
    ('Stockholm','Swedish','752','krona (pl. kronor)','SEK','öre (inv.)','Kingdom of Sweden','SE','SWE','Sweden','150','154',1),
    ('Berne','Swiss','756','Swiss franc','CHF','centime','Swiss Confederation','CH','CHE','Switzerland','150','155',1),
    ('Damascus','Syrian','760','Syrian pound','SYP','piastre','Syrian Arab Republic','SY','SYR','Syrian Arab Republic','142','145',0),
    ('Dushanbe','Tajik','762','somoni','TJS','diram','Republic of Tajikistan','TJ','TJK','Tajikistan','142','143',0),
    ('Bangkok','Thai','764','baht (inv.)','THB','satang (inv.)','Kingdom of Thailand','TH','THA','Thailand','142','035',0),
    ('Lomé','Togolese','768','CFA franc (BCEAO)','XOF','centime','Togolese Republic','TG','TGO','Togo','002','011',0),
    ('(TK2)','Tokelauan','772','New Zealand dollar','NZD','cent','Tokelau','TK','TKL','Tokelau','009','061',0),
    ('Nuku’alofa','Tongan','776','pa’anga (inv.)','TOP','seniti (inv.)','Kingdom of Tonga','TO','TON','Tonga','009','061',0),
    ('Port of Spain','Trinidadian; Tobagonian','780','Trinidad and Tobago dollar','TTD','cent','Republic of Trinidad and Tobago','TT','TTO','Trinidad and Tobago','019','029',0),
    ('Abu Dhabi','Emirian','784','UAE dirham','AED','fils (inv.)','United Arab Emirates','AE','ARE','United Arab Emirates','142','145',0),
    ('Tunis','Tunisian','788','Tunisian dinar','TND','millime','Republic of Tunisia','TN','TUN','Tunisia','002','015',0),
    ('Ankara','Turk','792','Turkish lira (inv.)','TRY','kurus (inv.)','Republic of Turkey','TR','TUR','Turkey','142','145',0),
    ('Ashgabat','Turkmen','795','Turkmen manat (inv.)','TMT','tenge (inv.)','Turkmenistan','TM','TKM','Turkmenistan','142','143',0),
    ('Cockburn Town','Turks and Caicos Islander','796','US dollar','USD','cent','Turks and Caicos Islands','TC','TCA','Turks and Caicos Islands','019','029',0),
    ('Funafuti','Tuvaluan','798','Australian dollar','AUD','cent','Tuvalu','TV','TUV','Tuvalu','009','061',0),
    ('Kampala','Ugandan','800','Uganda shilling','UGX','cent','Republic of Uganda','UG','UGA','Uganda','002','014',0),
    ('Kiev','Ukrainian','804','hryvnia','UAH','kopiyka','Ukraine','UA','UKR','Ukraine','150','151',0),
    ('Skopje','of the former Yugoslav Republic of Macedonia','807','denar (pl. denars)','MKD','deni (inv.)','the former Yugoslav Republic of Macedonia','MK','MKD','Macedonia, the former Yugoslav Republic of','150','039',0),
    ('Cairo','Egyptian','818','Egyptian pound','EGP','piastre','Arab Republic of Egypt','EG','EGY','Egypt','002','015',0),
    ('London','British','826','pound sterling','GBP','penny (pl. pence)','United Kingdom of Great Britain and Northern Ireland','GB','GBR','United Kingdom','150','154',1),
    ('St Peter Port','of Guernsey','831','Guernsey pound (GG2)','GGP (GG2)','penny (pl. pence)','Bailiwick of Guernsey','GG','GGY','Guernsey','150','154',0),
    ('St Helier','of Jersey','832','Jersey pound (JE2)','JEP (JE2)','penny (pl. pence)','Bailiwick of Jersey','JE','JEY','Jersey','150','154',0),
    ('Douglas','Manxman; Manxwoman','833','Manx pound (IM2)','IMP (IM2)','penny (pl. pence)','Isle of Man','IM','IMN','Isle of Man','150','154',0),
    ('Dodoma (TZ1)','Tanzanian','834','Tanzanian shilling','TZS','cent','United Republic of Tanzania','TZ','TZA','Tanzania, United Republic of','002','014',0),
    ('Washington DC','American','840','US dollar','USD','cent','United States of America','US','USA','United States','019','021',0),
    ('Charlotte Amalie','US Virgin Islander','850','US dollar','USD','cent','United States Virgin Islands','VI','VIR','Virgin Islands, U.S.','019','029',0),
    ('Ouagadougou','Burkinabe','854','CFA franc (BCEAO)','XOF','centime','Burkina Faso','BF','BFA','Burkina Faso','002','011',0),
    ('Montevideo','Uruguayan','858','Uruguayan peso','UYU','centésimo','Eastern Republic of Uruguay','UY','URY','Uruguay','019','005',0),
    ('Tashkent','Uzbek','860','sum (inv.)','UZS','tiyin (inv.)','Republic of Uzbekistan','UZ','UZB','Uzbekistan','142','143',0),
    ('Caracas','Venezuelan','862','bolívar fuerte (pl. bolívares fuertes)','VEF','céntimo','Bolivarian Republic of Venezuela','VE','VEN','Venezuela, Bolivarian Republic of','019','005',0),
    ('Mata-Utu','Wallisian; Futunan; Wallis and Futuna Islander','876','CFP franc','XPF','centime','Wallis and Futuna','WF','WLF','Wallis and Futuna','009','061',0),
    ('Apia','Samoan','882','tala (inv.)','WST','sene (inv.)','Independent State of Samoa','WS','WSM','Samoa','009','061',0),
    ('San’a','Yemenite','887','Yemeni rial','YER','fils (inv.)','Republic of Yemen','YE','YEM','Yemen','142','145',0),
    ('Lusaka','Zambian','894','Zambian kwacha (inv.)','ZMK','ngwee (inv.)','Republic of Zambia','ZM','ZMB','Zambia','002','014',0)");
    DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
