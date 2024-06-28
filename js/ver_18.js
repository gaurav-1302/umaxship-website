var booked_load_calendar_date_booking_options,booked_appt_form_options,bookedNewAppointment,previousRealModalHeight;(function(a,c,b,i){var h=a(c),d;a.fn.spin.presets.booked={lines:10,length:7,width:5,radius:11,corners:1,rotate:0,direction:1,color:'#555',speed:1,trail:60,shadow:!1,hwaccel:!1,className:'booked-spinner',zIndex:2e9,top:'50%',left:'50%'},a.fn.spin.presets.booked_top={lines:11,length:10,width:6,radius:15,corners:1,rotate:0,scale:.5,direction:1,color:'#aaaaaa',speed:1,trail:60,shadow:!1,hwaccel:!1,className:'booked-spinner booked-spinner-top',zIndex:2e9,top:'15px',left:'50%'},a.fn.spin.presets.booked_white={lines:13,length:11,width:5,radius:18,scale:1,corners:1,rotate:0,direction:1,color:'#fff',speed:1,trail:60,shadow:!1,hwaccel:!1,className:'booked-spinner booked-white',zIndex:2e9,top:'50%',left:'50%'},h.on('resize',function(){adjust_calendar_boxes(),resize_booked_modal()}),h.on('load',function(){var k,i,j,h;d.Init(),k=[],adjust_calendar_boxes(),a('.booked-calendar-wrap').each(function(){var b=a(this),c=b.find('div.booked-calendar').attr('data-calendar-date');b.attr('data-default',c),init_tooltips(b)}),a('.booked-list-view').each(function(){var b=a(this),c=b.find('.booked-appt-list').attr('data-list-date');b.attr('data-default',c)}),f(),e(),a('.booked_calendar_chooser').change(function(l){var h,k,d,i,j;return l.preventDefault(),h=a(this),k=h.parents('.booked-calendarSwitcher').hasClass('calendar'),k?(d=h.parents('.booked-calendar-shortcode-wrap').find('.booked-calendar-wrap'),i=d.attr('data-default'),typeof i=='undefined'&&(i=!1),j={action:'booked_calendar_month',nonce:booked_js_vars.nonce,gotoMonth:i,calendar_id:h.val()},g(!0,d),a.ajax({url:booked_js_vars.ajax_url,type:'post',data:j,success:function(b){d.html(b),adjust_calendar_boxes(),f(),init_tooltips(d),a(c).trigger('booked-load-calendar',j,h)}})):(d=h.parents('.booked-calendar-shortcode-wrap').find('.booked-list-view'),i=d.attr('data-default'),k=h.parents('.booked-calendarSwitcher').hasClass('calendar'),typeof i=='undefined'&&(i=!1),d.addClass('booked-loading'),j={action:'booked_appointment_list_date',nonce:booked_js_vars.nonce,date:i,calendar_id:h.val()},a(b).trigger("booked-before-loading-appointment-list-booking-options"),d.spin('booked_top'),a.ajax({url:booked_js_vars.ajax_url,type:'post',data:j,success:function(a){d.html(a),e(),setTimeout(function(){d.removeClass('booked-loading')},1)}})),!1}),a('body').on('click','.booked-calendar-wrap .page-right, .booked-calendar-wrap .page-left, .booked-calendar-wrap .monthName a',function(k){var b,i,d,e,j,h;return k.preventDefault(),b=a(this),i=b.attr('data-goto'),d=b.parents('.booked-calendar-wrap'),e=d.attr('data-default'),j=b.parents('div.booked-calendar').attr('data-calendar-id'),typeof e=='undefined'&&(e=!1),h={action:'booked_calendar_month',nonce:booked_js_vars.nonce,gotoMonth:i,calendar_id:j,force_default:e},g(!0,d),a.ajax({url:booked_js_vars.ajax_url,type:'post',data:h,success:function(e){d.html(e),adjust_calendar_boxes(),f(),init_tooltips(d),a(c).trigger('booked-load-calendar',h,b)}}),!1}),a('body').on('click','.booked-calendar-wrap .bc-row.week .bc-col',function(i){var c,d,g,h,e,j,f;i.preventDefault(),c=a(this),d=c.parents('div.booked-calendar'),g=c.parent(),h=c.attr('data-date'),e=d.attr('data-calendar-id'),j=g.find('.bc-col').length,e||(e=0),c.hasClass('blur')||c.hasClass('booked')&&!booked_js_vars.publicAppointments||c.hasClass('prev-date')||(c.hasClass('active')?(c.removeClass('active'),a('.bc-row.entryBlock').remove(),f=d.height(),d.parent().height(f)):(a('.bc-row.week .bc-col').removeClass('active'),c.addClass('active'),a('.bc-row.entryBlock').remove(),g.after('<div class="bc-row entryBlock booked-loading"><div class="bc-col"></div></div>'),a('.bc-row.entryBlock').find('.bc-col').spin('booked'),booked_load_calendar_date_booking_options={action:'booked_calendar_date',nonce:booked_js_vars.nonce,date:h,calendar_id:e},a(b).trigger("booked-before-loading-calendar-booking-options"),f=d.height(),d.parent().height(f),a.ajax({url:booked_js_vars.ajax_url,type:'post',data:booked_load_calendar_date_booking_options,success:function(b){a('.bc-row.entryBlock').find('.bc-col').html(b),a('.bc-row.entryBlock').removeClass('booked-loading'),a('.bc-row.entryBlock').find('.booked-appt-list').fadeIn(300),a('.bc-row.entryBlock').find('.booked-appt-list').addClass('shown'),adjust_calendar_boxes()}})))}),a('body').on('click','.booked-list-view .booked-list-view-date-prev, .booked-list-view .booked-list-view-date-next',function(j){var d,i,c,f,g,h;return j.preventDefault(),d=a(this),i=d.attr('data-date'),c=d.parents('.booked-list-view'),f=c.attr('data-default'),g=d.parents('.booked-list-view-nav').attr('data-calendar-id'),typeof f=='undefined'&&(f=!1),g||(g=0),c.addClass('booked-loading'),h={action:'booked_appointment_list_date',nonce:booked_js_vars.nonce,date:i,calendar_id:g,force_default:f},a(b).trigger("booked-before-loading-appointment-list-booking-options"),c.spin('booked_top'),a.ajax({url:booked_js_vars.ajax_url,type:'post',data:h,success:function(a){c.html(a),e(),setTimeout(function(){c.removeClass('booked-loading')},1)}}),!1}),bookedNewAppointment=function(j){var c,i,g,h,e,k,f,d;return j.preventDefault(),c=a(this),i=c.attr('data-title'),g=c.attr('data-timeslot'),h=c.attr('data-date'),e=c.attr('data-calendar-id'),k=c.parents('.timeslot'),f=c.parents('.booked-calendar-wrap').hasClass('booked-list-view'),typeof f!='undefined'&&f?(d=c.parents('.booked-list-view').find('.booked-list-view-nav').attr('data-calendar-id')):(d=c.parents('div.booked-calendar').attr('data-calendar-id')),e=d||e,booked_appt_form_options={action:'booked_new_appointment_form',nonce:booked_js_vars.nonce,date:h,timeslot:g,calendar_id:e,title:i},a(b).trigger("booked-before-loading-booking-form"),create_booked_modal(),setTimeout(function(){a.ajax({url:booked_js_vars.ajax_url,type:'post',data:booked_appt_form_options,success:function(e){var d,c;a('.bm-window').html(e),d=a('.booked-modal'),c=d.find('.bm-window'),c.css({visibility:'hidden'}),d.removeClass('bm-loading'),a(b).trigger("booked-on-new-app"),resize_booked_modal(),c.hide(),a('.booked-modal .bm-overlay').find('.booked-spinner').remove(),setTimeout(function(){c.css({visibility:'visible'}),c.show()},50)}})},100),!1},a('body').on('click','.booked-calendar-wrap button.new-appt',bookedNewAppointment),i=a('.booked-tabs'),i.find('li.active').length||i.find('li:first-child').addClass("active"),i.length&&(a('.booked-tab-content').hide(),j=i.find('.active > a').attr('href'),j=j.split('#'),j=j[1],a('#profile-'+j).show(),i.find('li > a').on('click',function(c){c.preventDefault(),a('.booked-tab-content').hide(),i.find('li').removeClass('active'),a(this).parent().addClass('active');var b=a(this).attr('href');return b=b.split('#'),b=b[1],a('#profile-'+b).show(),!1})),a('body').on('click','.booked-profile-appt-list .booked-show-cf',function(c){c.preventDefault();var b=a(this).parent().find('.cf-meta-values-hidden');return b.is(':visible')?(b.hide(),a(this).removeClass('booked-cf-active')):(b.show(),a(this).addClass('booked-cf-active')),!1}),a('#loginform').length&&a('#loginform input[type="submit"]').on('click',function(b){a('#loginform input[name="log"]').val()&&a('#loginform input[name="pwd"]').val()?a('#loginform .booked-custom-error').hide():a('#loginform').parents('.booked-form-wrap').length&&(b.preventDefault(),a('#loginform').parents('.booked-form-wrap').find('.booked-custom-error').fadeOut(200).fadeIn(200))}),a('#profile-forgot').length&&a('#profile-forgot input[type="submit"]').on('click',function(b){a('#profile-forgot input[name="user_login"]').val()?a('#profile-forgot .booked-custom-error').hide():(b.preventDefault(),a('#profile-forgot').find('.booked-custom-error').fadeOut(200).fadeIn(200))}),a('.booked-upload-wrap').length&&a('.booked-upload-wrap input[type=file]').on('change',function(){var b=a(this).val();a(this).parent().find('span').html(b),a(this).parent().addClass('hasFile')}),a('body').on('click','.booked-profile-appt-list .appt-block .cancel',function(f){var d,c,e,b;return f.preventDefault(),d=a(this),c=d.parents('.appt-block'),e=c.attr('data-appt-id'),confirm_delete=confirm(booked_js_vars.i18n_confirm_appt_delete),confirm_delete==!0&&(b=parseInt(a('.booked-profile-appt-list').find('h4').find('span.count').html()),b=parseInt(b-1),b<1?(a('.booked-profile-appt-list').find('h4').find('span.count').html('0'),a('.no-appts-message').slideDown('fast')):a('.booked-profile-appt-list').find('h4').find('span.count').html(b),a('.appt-block').animate({opacity:.4},0),c.slideUp('fast',function(){a(this).remove()}),a.ajax({url:booked_js_vars.ajax_url,method:'post',data:{action:'booked_cancel_appt',nonce:booked_js_vars.nonce,appt_id:e},success:function(b){a('.appt-block').animate({opacity:1},150)}})),!1}),a('body').on('touchstart click','.bm-overlay, .bm-window .close, .booked-form .cancel',function(a){return a.preventDefault(),close_booked_modal(),!1}),a('body').on('focusin','.booked-form input',function(){this.title==this.value&&(a(this).addClass('hasContent'),this.value='')}).on('focusout','.booked-form input',function(){this.value===''&&(a(this).removeClass('hasContent'),this.value=this.title)}),a('body').on('change','.booked-form input',function(){var b=a(this).attr('data-condition'),c=a(this).val();b&&a('.condition-block').length&&(a('.condition-block.'+b).hide(),a('#condition-'+c).fadeIn(200),resize_booked_modal())}),a('body').on('submit','form#ajaxlogin',function(d){d.preventDefault(),a('form#ajaxlogin p.status').show().html('<i class="fa-solid fa-circle-notch fa-spin"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_please_wait),resize_booked_modal();var b=a(this),e=b.data('date'),f=b.data('title'),g=b.data('timeslot'),h=b.data('calendar-id');a.ajax({type:'post',url:booked_js_vars.ajax_url,data:a('form#ajaxlogin').serialize(),success:function(d){if(d=='success'){close_booked_modal();var b=a('<button data-title="'+f+'" data-timeslot="'+g+'" data-date="'+e+'" data-calendar-id="'+h+'"></button>');b.on('click',c.bookedNewAppointment),b.triggerHandler('click'),b.unbind('click',c.bookedNewAppointment),b.detach()}else a('form#ajaxlogin p.status').show().html('<i class="fa-solid fa-triangle-exclamation" style="color:#E35656"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_wrong_username_pass),resize_booked_modal()}}),d.preventDefault()}),a('body').on('click','.booked-forgot-password',function(b){b.preventDefault(),a('#ajaxlogin').hide(),a('#ajaxforgot').show(),resize_booked_modal()}),a('body').on('click','.booked-forgot-goback',function(b){b.preventDefault(),a('#ajaxlogin').show(),a('#ajaxforgot').hide(),resize_booked_modal()}),a('body').on('submit','form#ajaxforgot',function(b){b.preventDefault(),a('form#ajaxforgot p.status').show().html('<i class="fa-solid fa-circle-notch fa-spin"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_please_wait),resize_booked_modal();var c=a(this);a.ajax({type:'post',url:booked_js_vars.ajax_url,data:a('form#ajaxforgot').serialize(),success:function(c){c=='success'?(b.preventDefault(),a('#ajaxlogin').show(),a('#ajaxforgot').hide(),a('form#ajaxlogin p.status').show().html('<i class="fa-solid fa-check" style="color:#56c477"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_password_reset),resize_booked_modal()):(a('form#ajaxforgot p.status').show().html('<i class="fa-solid fa-triangle-exclamation" style="color:#E35656"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_password_reset_error),resize_booked_modal())}}),b.preventDefault()}),a('body').on('click','.booked-form input#submit-request-appointment',function(o){a('form#newAppointmentForm p.status').show().html('<i class="fa-solid fa-circle-notch fa-spin"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_please_wait),resize_booked_modal(),o.preventDefault();var b=a('#newAppointmentForm input[name=customer_type]').val(),p=a('#newAppointmentForm input[name=user_id]').val(),l=a('#newAppointmentForm input[name=booked_appt_name]').val(),m=a('#newAppointmentForm input[name=booked_appt_surname]').val(),i=a('#newAppointmentForm input[name=booked_appt_surname]').length,c=a('#newAppointmentForm input[name=guest_name]').val(),j=a('#newAppointmentForm input[name=guest_surname]').val(),d=a('#newAppointmentForm input[name=guest_surname]').length,g=a('#newAppointmentForm input[name=guest_email]').val(),e=a('#newAppointmentForm input[name=guest_email]').length,n=a('#newAppointmentForm input[name=booked_appt_email]').val(),k=a('#newAppointmentForm input[name=booked_appt_password]').val(),f=!1,q=[];if(a(this).parents('.booked-form').find('input,textarea,select').each(function(h,b){var d=a(this).attr('required'),c,e,g;d&&a(b).attr('type')=='hidden'?(c=a(b).attr('name'),c=c.split('---'),fieldName=c[0],fieldNumber=c[1].split('___'),fieldNumber=fieldNumber[0],fieldName=='radio-buttons-label'?(e=!1,a('input:radio[name="single-radio-button---'+fieldNumber+'[]"]:checked').each(function(){a(this).val()&&(e=a(this).val())}),e||(f=!0)):fieldName=='checkboxes-label'&&(g=!1,a('input:checkbox[name="single-checkbox---'+fieldNumber+'[]"]:checked').each(function(){a(this).val()&&(g=a(this).val())}),g||(f=!0))):d&&a(b).attr('type')!='hidden'&&a(b).val()==''&&(f=!0)}),f)return a('form#newAppointmentForm p.status').show().html('<i class="fa-solid fa-triangle-exclamation" style="color:#E35656"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_fill_out_required_fields),resize_booked_modal(),!1;if(b=='new'&&!l||b=='new'&&i&&!m||b=='new'&&!n||b=='new'&&!k)return a('form#newAppointmentForm p.status').show().html('<i class="fa-solid fa-triangle-exclamation" style="color:#E35656"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_appt_required_fields),resize_booked_modal(),!1;if(b=='guest'&&!c||b=='guest'&&e&&!g||b=='guest'&&d&&!j)return a('form#newAppointmentForm p.status').show().html('<i class="fa-solid fa-triangle-exclamation" style="color:#E35656"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_appt_required_fields_guest),resize_booked_modal(),!1;(b=='current'&&p||b=='guest'&&c&&!d&&!e||b=='guest'&&c&&d&&j&&!e||b=='guest'&&c&&e&&g&&!d||b=='guest'&&c&&e&&g&&d&&j)&&h.currentUserOrGuest(),b=='new'&&l&&n&&k&&(!i||i&&m)&&h.newUser()}),h={formSelector:'#newAppointmentForm',formBtnRequestSelector:'.booked-form input#submit-request-appointment',formStatusSelector:'p.status',formSubmitBtnSelector:'#submit-request-appointment',apptContainerSelector:'.booked-appointment-details',baseFields:['guest_name','guest_surname','guest_email','action','customer_type','user_id'],apptFields:['appoinment','calendar_id','title','date','timestamp','timeslot'],userFields:['booked_appt_name','booked_appt_surname','booked_appt_email','booked_appt_password'],captchaFields:['captcha_word','captcha_code'],currentApptIndex:!1,currentApptCounter:!1,hasAnyErrors:!1,currentUserOrGuest:function(){var a=h._totalAppts(),b;if(!a)return;h._showLoadingMessage(),h._resetDefaultValues(),b=h._getBaseData(),h.currentApptIndex=0,h.currentApptCounter=1,h._doRequestAppointment(b,a)},newUser:function(){var d=h._totalAppts(),b,c;if(!d)return;h._showLoadingMessage(),h._resetDefaultValues(),b=h._getBaseData(),d>1?(c=null,c=a.extend(!0,{},b),c=h._addUserRegistrationData(c),h._requestUserRegistration(c),b.customer_type='current'):b=h._addUserRegistrationData(b),h.currentApptIndex=0,h._doRequestAppointment(b,d)},_doRequestAppointment:function(d,e){var f=h.apptFields,b,c,g,i;h.currentApptIndex===0&&(h._hideCancelBtn(),h._disableSubmitBtn(),h.hasAnyErrors=!1),b=a.extend(!0,{},d);for(c=0;c<f.length;c++)b[f[c]]=h._getFieldVal(f[c],h.currentApptIndex);g=h._getFieldVal('calendar_id',h.currentApptIndex),b=h._addCustomFieldsData(b,g),i=h._getApptElement(h.currentApptIndex),i.hasClass('skip')?(h.currentApptIndex++,h.currentApptCounter++,h._doRequestAppointment(d,e,h.currentApptIndex)):a.ajax({type:'post',url:booked_js_vars.ajax_url,data:b,success:function(a){h._requestAppointmentResponseHandler(a),h.currentApptIndex++,setTimeout(function(){h.currentApptCounter===e?h.hasAnyErrors?(h._enableSubmitBtn(),h._showCancelBtn()):h._onAfterRequestAppointment():(h.currentApptCounter++,h._doRequestAppointment(d,e))},100)}})},_totalAppts:function(){return a(h.formSelector+' input[name="appoinment[]"]').length},_getBaseData:function(){for(var a={},c=h.baseFields,b=0;b<c.length;b++)a[c[b]]=h._getFieldVal(c[b]);return a.nonce=booked_js_vars.nonce,a.is_fe_form=!0,a.total_appts=h._totalAppts(),a},_getFieldVal:function(b,c){var b=typeof b=='undefined'?'':b,c=typeof c!='undefined'&&c,d=h.formSelector+' ';return c===!1?(d+=' [name='+b+']',a(d).val()):(d+=' [name="'+b+'[]"]',a(d).eq(c).val())},_resetDefaultValues:function(){a('.booked-form input').each(function(){var b=a(this).val(),c=a(this).attr('title');c==b&&a(this).val('')})},_resetToDefaultValues:function(){a('.booked-form input').each(function(){var b=a(this).val(),c=a(this).attr('title');b||a(this).val(c)})},_addUserRegistrationData:function(b){return a.each(h.userFields,function(c,a){b[a]=h._getFieldVal(a)}),a.each(h.captchaFields,function(d,a){var c=h._getFieldVal(a);if(!c)return;b[a]=c}),b},_addCustomFieldsData:function(b,c){var d=a('.cf-block [name]').filter(function(d){var b=a(this);return parseInt(b.data('calendar-id'))===parseInt(c)&&b.attr('name').match(/---\d+/g)}).each(function(f){var d=a(this),c=d.attr('name'),e=d.val(),g=d.attr('type');if(!e)return;if(!c.match(/checkbox|radio+/g)){b[c]=e;return}if(c.match(/radio+/g)&&d.is(':checked')){b[c]=e;return}if((!c.match(/radio+/g)&&typeof b[c]=='undefined'||!c.match(/radio+/g)&&b[c].constructor!==Array)&&(b[c]=[]),!d.is(':checked'))return;b[c].push(e)});return b},_requestUserRegistration:function(b,c){a.ajax({type:'post',url:booked_js_vars.ajax_url,data:b,async:!1,success:function(a){h._requestUserRegistrationResponseHandler(a)}})},_requestUserRegistrationResponseHandler:function(b){var a=b.split('###'),c=a[0].substr(a[0].length-5);if(c==='error')return},_requestAppointment:function(a){h._requestAppointmentResponseHandler(a)},_requestAppointmentResponseHandler:function(b){var a=b.split('###'),c=a[0].substr(a[0].length-5);if(c==='error'){h._requestAppointmentOnError(a);return}h._requestAppointmentOnSuccess(a)},_requestAppointmentOnError:function(c){var d=h._getApptElement();a(b).trigger("booked-on-requested-appt-error",[d]),h._highlightAppt(),h._setStatusMsg(c[1]),h.hasAnyErrors=!0,resize_booked_modal()},_requestAppointmentOnSuccess:function(d){var c=h._getApptElement();a(b).trigger("booked-on-requested-appt-success",[c]),h._unhighlightAppt()},_onAfterRequestAppointment:function(){var d={redirect:!1},e=a(b).trigger("booked-on-requested-appointment",[d]);if(d.redirect)return;if(booked_js_vars.profilePage){c.location=booked_js_vars.profilePage;return}h._reloadApptsList(),h._reloadCalendarTable()},_setStatusMsg:function(b){var c=h.formSelector+' '+h.formStatusSelector;a(c).show().html('<i class="fa-solid fa-triangle-exclamation" style="color:#E35656"></i>&nbsp;&nbsp;&nbsp;'+b)},_getApptElement:function(b){var b=typeof b=='undefined'?h.currentApptIndex:b,c=h.formSelector+' '+h.apptContainerSelector;return a(c).eq(b)},_highlightAppt:function(b){var a=h._getApptElement();if(!a.length)return;a.addClass('has-error')},_unhighlightAppt:function(b){var a=h._getApptElement();if(!a.length)return;a.removeClass('has-error').addClass('skip')},_enableSubmitBtn:function(){var b=h.formSelector+' '+h.formSubmitBtnSelector;a(b).attr('disabled',!1)},_disableSubmitBtn:function(){var b=h.formSelector+' '+h.formSubmitBtnSelector;a(b).attr('disabled',!0)},_showCancelBtn:function(){a(h.formSelector).find('button.cancel').show()},_hideCancelBtn:function(){a(h.formSelector).find('button.cancel').hide()},_showLoadingMessage:function(){a('form#newAppointmentForm p.status').show().html('<i class="fa-solid fa-circle-notch fa-spin"></i>&nbsp;&nbsp;&nbsp;'+booked_js_vars.i18n_please_wait)},_reloadApptsList:function(){if(!a('.booked-appt-list').length)return;a('.booked-appt-list').each(function(){var g=a(this),h=g.attr('data-list-date'),c=g.parents('.booked-list-view'),d=c.attr('data-default'),f=parseInt(g.find('.booked-list-view-nav').attr('data-calendar-id'))||0,i;d=typeof d!='undefined'&&d,f=f||0,c.addClass('booked-loading'),i={action:'booked_appointment_list_date',nonce:booked_js_vars.nonce,date:h,calendar_id:f,force_default:d},a(b).trigger("booked-before-loading-appointment-list-booking-options"),c.spin('booked_top'),a.ajax({url:booked_js_vars.ajax_url,type:'post',data:i,success:function(a){c.html(a),close_booked_modal(),e(),setTimeout(function(){c.removeClass('booked-loading')},1)}})})},_reloadCalendarTable:function(){if(!a('.bc-col.active').length)return;var c=a('.bc-col.active'),d=c.attr('data-date'),e=parseInt(c.parents('table').data('calendar-id'))||0;booked_load_calendar_date_booking_options={action:'booked_calendar_date',nonce:booked_js_vars.nonce,date:d,calendar_id:e},a(b).trigger("booked-before-loading-calendar-booking-options"),a.ajax({url:booked_js_vars.ajax_url,type:'post',data:booked_load_calendar_date_booking_options,success:function(b){a('.bc-row.entryBlock').find('.bc-col').html(b),close_booked_modal(),a('.bc-row.entryBlock').removeClass('booked-loading'),a('.bc-row.entryBlock').find('.booked-appt-list').hide().fadeIn(300),a('.bc-row.entryBlock').find('.booked-appt-list').addClass('shown'),adjust_calendar_boxes()}})}}});function f(){a('div.booked-calendar').find('.bc-row.week').each(function(){a(this).children().length==0&&a(this).remove()})}function g(c,b){var d,e,f;c=typeof c=='undefined'||c,b=typeof b!='undefined'&&b,b?(d=b.find('li.active .savingState, .topSavingState.savingState, .calendarSavingState'),e=b.find('.monthName'),f=b.find('div.booked-calendar .bc-body')):(d=a('li.active .savingState, .topSavingState.savingState, .calendarSavingState'),e=a('.monthName'),f=a('div.booked-calendar .bc-body')),c?(d.fadeIn(200),e.hide(),f.animate({opacity:.2},100)):(d.hide(),e.show(),f.animate({opacity:1},0))}a(b).ajaxStop(function(){g(!1)});function e(){a('.booked_list_date_picker').each(function(){var c=a(this),d=c.parents('.booked-appt-list').attr('data-min-date'),f=c.parents('.booked-appt-list').attr('data-max-date');typeof d=='undefined'&&(d=c.attr('data-min-date')),c.datepicker({dateFormat:'yy-mm-dd',minDate:d,maxDate:f,showAnim:!1,beforeShow:function(b,c){a('#ui-datepicker-div').removeClass(),a('#ui-datepicker-div').addClass('booked_custom_date_picker')},onClose:function(b){a('.booked_list_date_picker_trigger').removeClass('booked-dp-active')},onSelect:function(h){var g=a(this),i=h,c=g.parents('.booked-list-view'),d=c.attr('data-default'),f=g.parents('.booked-list-view-nav').attr('data-calendar-id'),j;return typeof d=='undefined'&&(d=!1),f||(f=0),c.addClass('booked-loading'),j={action:'booked_appointment_list_date',nonce:booked_js_vars.nonce,date:i,calendar_id:f,force_default:d},a(b).trigger("booked-before-loading-appointment-list-booking-options"),c.spin('booked_top'),a.ajax({url:booked_js_vars.ajax_url,type:'post',data:j,success:function(a){c.html(a),e(),setTimeout(function(){c.removeClass('booked-loading')},1)}}),!1}})}),a('body').on('click','.booked_list_date_picker_trigger',function(b){b.preventDefault(),a(this).hasClass('booked-dp-active')||(a(this).addClass('booked-dp-active'),a(this).parents('.booked-appt-list').find('.booked_list_date_picker').datepicker('show'))})}d={bookingModalSelector:'.booked-modal',tabSelector:'.booked-tabs',tabNavSelector:'.booked-tabs-nav span',tabCntSelector:'.booked-tabs-cnt',Init:function(){a(b).on('click',this.tabNavSelector,this.tabsNav)},tabsNav:function(b){b.preventDefault(),d.switchToTab(a(this)),d.maybeResizeBookingModal()},switchToTab:function(b){var a=b,c='.'+a.data('tab-cnt'),e=a.parents(d.tabSelector);a.addClass('active').siblings().removeClass('active'),e.find(d.tabCntSelector+' '+c).addClass('active').siblings().removeClass('active')},maybeResizeBookingModal:function(){if(!a(d.bookingModalSelector).length)return;resize_booked_modal()}}})(jQuery,window,document);function create_booked_modal(){var a=jQuery(window).height(),c=jQuery(window).width(),b;c>720?(b=a-295):(b=a),jQuery('body input, body textarea, body select').blur(),jQuery('body').addClass('booked-noScroll'),jQuery('<div class="booked-modal bm-loading"><div class="bm-overlay"></div><div class="bm-window"><div style="height:100px"></div></div></div>').appendTo('body'),jQuery('.booked-modal .bm-overlay').spin('booked_white'),jQuery('.booked-modal .bm-window').css({'max-height':b+'px'})}previousRealModalHeight=100;function resize_booked_modal(){var f=jQuery(window).height(),i=jQuery(window).width(),c=43,b,h,e,a,d,g;jQuery('.booked-modal .bm-window .booked-scrollable').length?(b=jQuery('.booked-modal .bm-window .booked-scrollable')[0].scrollHeight,b<100?b=previousRealModalHeight:previousRealModalHeight=b):(b=0),h=b+c+c,e=b-c,f<h?e=f-c-c:e=b,i>720?(a=e-25,d=a-15,g=(a+78)/2):(a=f-c,d=a-60,g=a/2),jQuery('.booked-modal').css({'margin-top':'-'+g+'px'}),jQuery('.booked-modal .bm-window').css({'max-height':a+'px'}),jQuery('.booked-modal .bm-window .booked-scrollable').css({'max-height':d+'px'})}function close_booked_modal(){var a=jQuery('.booked-modal');a.fadeOut(200),a.addClass('bm-closing'),jQuery('body').removeClass('booked-noScroll'),setTimeout(function(){a.remove()},300)}function init_tooltips(a){jQuery('.tooltipster').tooltipster({theme:'tooltipster-light',animation:'grow',speed:200,delay:50,offsetY:-15})}function adjust_calendar_boxes(){jQuery('div.booked-calendar').each(function(){var b=jQuery(window).width(),c=jQuery(this).parents('.booked-calendar-wrap').hasClass('small'),d=jQuery(this).find('.bc-body .bc-row.week .bc-col').width(),a=jQuery(this).height();boxesHeight=d*1,jQuery(this).find('.bc-body .bc-row.week .bc-col').height(boxesHeight),jQuery(this).find('.bc-body .bc-row.week .bc-col .date').css('line-height',boxesHeight+'px'),jQuery(this).find('.bc-body .bc-row.week .bc-col .date .number').css('line-height',boxesHeight+'px'),c||b<720?jQuery(this).find('.bc-body .bc-row.week .bc-col .date .number').css('line-height',boxesHeight+'px'):jQuery(this).find('.bc-body .bc-row.week .bc-col .date .number').css('line-height',''),a=jQuery(this).height(),jQuery(this).parent().height(a)})}
