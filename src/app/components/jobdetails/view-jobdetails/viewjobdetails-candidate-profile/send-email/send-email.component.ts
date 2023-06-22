
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { JobdetailsService } from '../../../jobdetails.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { SettingsService } from '../../../../../../settings/settings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../../../../../app.service';
import { CustomerSubscription } from '../../../../../../models/CustomerSubscription';
import { GetSubscriptionDetails } from '../../../../../../models/GetSubscriptionDetails';
import { FormGroup, AbstractControl, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css','./send-email-new.component.css'],
  providers: [ApiService]
})
export class SendEmailComponent implements OnInit {
  conversation = new StartConversation();
  emailUpdate = new EmailUpdateStatus();
  subject: string;
  isChecked: boolean = false;
  ccEmailAddress: string;
  ToEmailID: string;
  customerName = null;
  chipList:any;
  fromId:any;
  mailbox: any = false;
  subdetails = new CustomerSubscription();
  sdetails = new GetSubscriptionDetails();
  isPublicAvailable: any;
  checkvalue: any;
  UserId: any;
  UserRoleId: any;
  body: string;
  jobSignature:any;
  isSendingEmail: boolean;
  public separatorKeysCodes = [ENTER, COMMA];
  public ccseparatorKeysCodes = [ENTER, COMMA];
  public bccseparatorKeysCodes = [ENTER, COMMA];
  public emailList = [];
  public ccemailList = [];
  public bccemailList = [];
  removable = true;
  cremovable = true;
  bcremovable = true;
  rulesForm: FormGroup;
  ccrulesForm: FormGroup;
  bccrulesForm: FormGroup;
  activeAny: string;
  showCC: boolean = false;
  defaultComments:any;
  showBCC: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  fb: FormBuilder = new FormBuilder();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appService: AppService, private _service: ApiService, public dialogRef: MatDialogRef<SendEmailComponent>, private toastr: ToastsManager, private _vcr: ViewContainerRef, private jobdetailsservice: JobdetailsService, private settingsService: SettingsService) {
    this.toastr.setRootViewContainerRef(_vcr);
    this.customerName = JSON.parse(sessionStorage.getItem('userData'));
    this.fromId = this.customerName.Email;
    this.emailUpdate.JobId = data.jobId;
    this.emailUpdate.JobResponseId = data.jobResponseId;
    this.emailUpdate.ProfileId = data.profileId;
    this.emailUpdate.ResponseStatusId = data.responseStatusId;
    this.mailbox = false;
    this.defaultComments = 'Join hands with us and make your goals achieved!.'; 
    this.body = this.defaultComments;
    this.subject = 'Please submit the consent';
    this.ToEmailID = this.data.EmailId;
    this.Check();
    this.UserCheck(this.data.ProfileId);
    this.GetCustomerSubscription();
  }

  ngOnInit() {
    this.jobSignature = '<div class="signature"><span style="font-family:&quot;Calibri&quot;,sans-serif; font-size:11pt; mso-ascii-theme-font:minor-latin; mso-bidi-font-family:&quot;Times New Roman&quot;; mso-bidi-theme-font:minor-bidi; mso-hansi-theme-font:minor-latin"><!--?xml:namespace prefix = "o" ns = "urn:schemas-microsoft-com:office:office" /--></span><span style="font-family:&quot;Calibri&quot;,sans-serif; font-size:11pt; mso-ascii-theme-font:minor-latin; mso-bidi-font-family:&quot;Times New Roman&quot;; mso-bidi-theme-font:minor-bidi; mso-hansi-theme-font:minor-latin"><!--?xml:namespace prefix = "o" ns = "urn:schemas-microsoft-com:office:office" /--></span><p>Thanks and Regards.</p><p><strong>SRI RAO BODDAPU&nbsp;|</strong> <strong>PRESIDENT/FOUNDER</strong></p><p>Esolvit, Inc. | <a href="https://maps.google.com/?q=11675+Jollyville+Road,+Suite+152,+Austin,+TX+78759&amp;entry=gmail&amp;source=g">11675 Jollyville Road, Suite 152, Austin, TX 78759</a></p><p>Direct&nbsp;(512) 507-5666&nbsp;| sri@esolvit.com</p><p><strong><em>Esolvit Inc., Won "Economic Engine award from GAACC 2017"</em></strong></p><p><a href="https://www.linkedin.com/in/boddapu"><img alt="linkedin" src="data:image/png;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI0OEMzQ0RGQkQyMTExRTRCRDI0Q0MyQURBQUQ2M0NCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI0OEMzQ0UwQkQyMTExRTRCRDI0Q0MyQURBQUQ2M0NCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjQ4QzNDRERCRDIxMTFFNEJEMjRDQzJBREFBRDYzQ0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjQ4QzNDREVCRDIxMTFFNEJEMjRDQzJBREFBRDYzQ0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEB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" style="height:30px; width:30px" /></a>&nbsp;<a href="https://www.facebook.com/srirao.boddapu"><img alt="facebook" src="data:image/png;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJDQTFBQjJCQkQyMTExRTRCN0MzOUYwRkY4RTdEQTREIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJDQTFBQjJDQkQyMTExRTRCN0MzOUYwRkY4RTdEQTREIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkNBMUFCMjlCRDIxMTFFNEI3QzM5RjBGRjhFN0RBNEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkNBMUFCMkFCRDIxMTFFNEI3QzM5RjBGRjhFN0RBNEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEB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" style="height:30px; width:30px" /></a>&nbsp;<a href="https://twitter.com/sriraoboddapu"><img alt="twitter" src="data:image/png;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNDRjJCNzQ3QkQyMTExRTQ4NTI3Qjg2QUVERjdCREI3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNDRjJCNzQ4QkQyMTExRTQ4NTI3Qjg2QUVERjdCREI3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0NGMkI3NDVCRDIxMTFFNDg1MjdCODZBRURGN0JEQjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0NGMkI3NDZCRDIxMTFFNDg1MjdCODZBRURGN0JEQjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQIBAQICAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wAARCAAeAB4DAREAAhEBAxEB/8QAlwAAAgIDAQAAAAAAAAAAAAAABAkDBgIFBwgBAAEEAgMAAAAAAAAAAAAAAAQDBQgJAAIGBwoQAAEEAQIDBQUJAQAAAAAAAAQBAgMFBhEHABITISIyFAgxYRUWCUFR0UIjJHTEllcRAAMAAQMBBAcGBwAAAAAAAAECAwQREgUAITEGByIyosLSEwhBUVJyUxSRodFiMzQW/9oADAMBAAIRAxEAPwD3fZWdiXYWdjZWticcbYHn2NlY2JZZpphRUxBZxxpM0kxBBE0jnve9yqqr92icXHYuLjRxpY2NGU4JNERERVVVVQFVVUAAAAAAD+fXl95DkM/JzsjOz8m9sutqUrWtXelHdyz0pR2LMzMSWZif4dCOKma1XuKmaxrVe57iJGtaxqcznOcr0RrWtTVVXsROFhKZOgRdSdPVH9OhWybKpZqOFA1JLHQDv1J17tPt6i+IuSSOFxk8c0zWvghmmnhlnjc1XNlgjlcx88L2tVUexFaqJ2Lxv+2G0uEUoveQAQD9xI1AP3g6EdJ/v2FFk1XWrjVVZmVmH2FQdCynQ6MAQdDoetkJZWY0dlGNaWYsR9cgVjCNYFwQ2ITbSrsGB2EMczYjRorACAhjJEcjJoWPboqa8C2xsWjyNZSdp03ISiko3y3TchI1VijuhI01ViDqOj8bP5CE8hMfIyJztATqq0dVrMWlQJRQwDqKznRQwIV0VhoRr1ZtvjgKzdLb+xtoaImoD3Gxia2FynVMXJrfmIRhkGRuQcvp0kkD1Qh6xSsjj1c9rmNcnDV4ihkZXhPkcbDOQuY/G3E2h/nD/JYqY9q61BHoAMpJ7FIYg9cg8E5mFx/mLwmdyS4b8bLncNrLl/6jS/coKLlei+mOVJ+axR1VfSdSgYdOuT6bWz826GG7o4VkUw2ECZIBltvtXZig5fhN0MySU+OupLNSBzAaXzjoZYxpXHiKyLpoxIncqQgH1L+Mf+TzPC3M46Pzb4rY88+bNj5MiQFL0QBleu3cpdRKmrbi28am2dvoL8sT5i8X5g+Fs15eE5Z88y3D2nPMwbqCaCcKllecN+xllQ5MSq7Aom20B/VPykHBvT9RDUlDhE2bblZ9jG0VJZ39IKbZ1GM2kZ+SZU+hIjY04FB6nFu1WKsDFVquY5eROG/6asPkOV8w1T9zlpx2LF8yiJRlnSqaTn81e1WJNTpqN3foR2np/wDrrzuA8P8AkrS9cDAtzGfefGyq8Ea8YVDWoIPoHmoMJ7tGE9NNwJ2jpFkSM/cJ3uToae1efTzI35ubXX366+/iwtz6Sn+73W6pPn6j/k95epEhriLBYLhTkqJzJobR1XCMTZtAkkkYS4AYwkMQopI17sck0TZPDztVUXhMPkzxhTC2HMVAZhywQuACoZlDMoJ+0KxHfoelflYF80w5U1HFvUrYyVWqJsSHM0dkR2AOoVnQN2jcCQemt7X/AFRdgtmdtIMPyPJfUXvTlFJzCUAhfp+Gwu8hqRgxhKXF+atfX4vLDWtH5POzmTTyI9XPfIqIqwg8WfT9448T+Krcjx3H8VxGBdyzqmZW897MWpQF0NfSJ12BFUdwAHVuPlx9Y/lR4B8ucXhuZ5vnfEfKYkQk2px2LiZBkiKkoskrCPoKoBc0ejdpYse9cO+/qE3T9We6NduhuVSx4FiWGA2tVs/tHCclmRjMN50o73Lsvso2xQn5jdCDRQaRsZGLAxGMYnfkmkt5W+V/E+WXDviYrnI5fJ2nIuRt3lddqIup2STUlQSWYsWY9oVYG/UR9QnP+fHiOeVkzGJ4Zwty4mKrFggbTfSj6KaVrtXe21VCrNFmChenPYvCR/H/ALI3HZj+sv5vdbqPc/Vf8nvL1U7O5ykCysgXYTHdKFYHCLc0GVAxUVx5cqWFLSniyCtp76GssGsSaGM0UcqNj0bIxHIvA+Jd7YsqtGsmaako5mWQkAlWKUdCV7iVZlOmoJHR3JYcMXkL40cvHyZJV1FZrdZ0AYgOgtGdQrd4FJo+h9JQezrBmSZr0/09trzpaL4Mtx/p6fb7E5dOCN7fgb2fi6B+Wn6ie38HQvzJlH/NrP8A1uNfhxm9vwN7PxdZ8tf1E9v4OjRLnKiYbOZMJYAgFe0twtjlQLzrvntKwFtXQfDa0wGKyi84psslhMGKgQczGPeS+CJ49rulJKI1ffQgkGeiDY7bn3UDEEgIAgdtzAkBAzA7Fw4Vx8mr5ePJ5RDKjLctYmsl2TKRZFZQxoTVpoURgrGhRH//2Q==" style="height:30px; width:30px" /></a>&nbsp;<a href="https://www.youtube.com/watch?v=c35I15jm5L8&amp;feature=youtu.be"><img alt="youtube" src="data:image/png;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM0NkQyRTM2QkQyMTExRTRBMUNDQUU0QzVFQjI2MjBGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM0NkQyRTM3QkQyMTExRTRBMUNDQUU0QzVFQjI2MjBGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzQ2RDJFMzRCRDIxMTFFNEExQ0NBRTRDNUVCMjYyMEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzQ2RDJFMzVCRDIxMTFFNEExQ0NBRTRDNUVCMjYyMEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEB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" style="height:30px; width:30px" /></a>&nbsp;&nbsp;&nbsp;&nbsp;</p><p>------------------------------------<img alt="cid:ii_j6nr501h0_15e0a95676392207" src="data:image/png;base64,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" style="height:57px; width:257px" /><img src="https://attachments.office.net/owa/tina@esolvit.com/service.svc/s/GetFileAttachment?id=AAMkADUyOWJmOTk2LTE2ZjItNGYyZC04N2ZmLTkxMTMwOTY1NjZhYQBGAAAAAAC7fA0mPeq0SLNl2HksShcSBwA20xXPfZZLSqhsAKGAyCdQAAAAAAEMAAA20xXPfZZLSqhsAKGAyCdQAAJDqlLpAAABEgAQAENPtz%2BXvDVGgGDlztnzpxY%3D&amp;X-OWA-CANARY=z8Oo_j-qgEGUXrBOKdWQu4Dfakbco9YYhd8OP_vAcmV2LeMUU8dW2m4XvEmbgzzMPJotu3bzka8.&amp;token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2MDBGOUY2NzQ2MjA3MzdFNzM0MDRFMjg3QzQ1QTgxOENCN0NFQjgiLCJ4NXQiOiJCZ0Q1OW5SaUJ6Zm5OQVRpaDhSYWdZeTN6cmciLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiJFeGNoYW5nZS5DYWxsYmFjay5WMSIsImFwcGN0eHNlbmRlciI6Ik93YURvd25sb2FkQDc4MTViMGI0LWZmYzAtNDFlNy1hNjEwLTZmOTE1MzRkMTBhYSIsImFwcGN0eCI6IntcIm1zZXhjaHByb3RcIjpcIm93YVwiLFwicHJpbWFyeXNpZFwiOlwiUy0xLTUtMjEtNjQwMDY0ODctMTQ4Mzc2MDgtMTE3NTQwNzM5MC04NTMwNzEyXCIsXCJwdWlkXCI6XCIxMTUzNzY1OTMyMTM5ODk4ODA2XCIsXCJvaWRcIjpcIjgwM2E2OGFmLTBjZjQtNDBjNC1hMjU2LTQxNDFkODFhZTQ4MVwiLFwic2NvcGVcIjpcIk93YURvd25sb2FkXCJ9IiwibmJmIjoxNTUyMDU5NDc1LCJleHAiOjE1NTIwNjAwNzUsImlzcyI6IjAwMDAwMDAyLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMEA3ODE1YjBiNC1mZmMwLTQxZTctYTYxMC02ZjkxNTM0ZDEwYWEiLCJhdWQiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXR0YWNobWVudHMub2ZmaWNlLm5ldEA3ODE1YjBiNC1mZmMwLTQxZTctYTYxMC02ZjkxNTM0ZDEwYWEifQ.I8vDzbsNbboyc8e2kGGO6460Ga5cY8ieMf9iZLAwJFoTb6XjnGrUJgV72PPza3S6UMgCd25VHSZi0kgz90aAfR16ivdtO1kEputwKaOQpYz2e3U_EaWjQ8CjG9rSJdMUnl3ImTmMOsA8sTQrSaaA7zibBA0m2r4VME8WWKHomenIpA4nAI73qhsIRk7nijXt_ftwWoekm8wFaBPg3krAHjTsgIPT-0QLFUh4c4pGjxTiQTEtU4qjX8UBCQRTX4xoNHGZsQeuarbxQnJvV6uTmCuQD8yRmWnPLKZlVSEaWhVxBz2Q58haMbOY5BQ2pqKOaxzdVqMguRy_Kzt67AWTwQ&amp;owa=outlook.office.com&amp;isImagePreview=True" />------------------------------</p></p>Disclaimer: This email and any attachments are confidential and/or proprietary and intended solely for the named recipients. Unauthorized use, copying, or distribution is prohibited. If you received this e-mail in error, please notify me by replying and delete the message without copying or disclosing it. Thank you</p><p>&nbsp;</p><p class="MsoNormal" style="margin-bottom:0pt; margin-left:0in; margin-right:0in; margin-top:0in"><span style="font-family:&quot;Calibri&quot;,sans-serif; font-size:11pt; mso-ascii-theme-font:minor-latin; mso-bidi-font-family:&quot;Times New Roman&quot;; mso-bidi-theme-font:minor-bidi; mso-hansi-theme-font:minor-latin">&nbsp;</span></p><p class="MsoNormal" style="margin-bottom:0pt; margin-left:0in; margin-right:0in; margin-top:0in"><span style="font-family:&quot;Calibri&quot;,sans-serif; font-size:10pt; mso-bidi-font-family:&quot;Times New Roman&quot;; mso-bidi-theme-font:minor-bidi; mso-fareast-font-family:&quot;Times New Roman&quot;; mso-fareast-theme-font:minor-fareast; mso-no-proof:yes">&nbsp;</span></p><p class="MsoNormal" style="margin-bottom:0pt; margin-left:0in; margin-right:0in; margin-top:0in"><span style="font-family:&quot;Calibri&quot;,sans-serif; font-size:11pt; mso-ascii-theme-font:minor-latin; mso-bidi-font-family:&quot;Times New Roman&quot;; mso-bidi-theme-font:minor-bidi; mso-hansi-theme-font:minor-latin">&nbsp;</span></p></div>';
    this.mailbox = true;
    this.rulesForm = this.fb.group({
      emails: this.fb.array([], this.validateArrayNotEmpty)
    });
    this.ccrulesForm = this.fb.group({
      CCemails: this.fb.array([], this.validateArrayNotEmpty)
    });
    this.bccrulesForm = this.fb.group({
      BCCemails: this.fb.array([], this.validateArrayNotEmpty)
    });

    this.emailList.push({ value: this.data.EmailId, invalid: false });
    this.dropdownList = [
      { item_id: 1, item_text: 'Shaik Mohammed' ,isDisabled: false},
      { item_id: 2, item_text: 'D’Mani Dave',isDisabled: false },
      { item_id: 3, item_text: 'Pawan Bothra',isDisabled: false },
      { item_id: 4, item_text: 'Kinjal Mehta' ,isDisabled: false}
    ];

    this.dropdownSettings  = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.activeAny = 'Normal';
  }

  showClickCC() {
    this.showCC = !this.showCC;
  }

  showClickBCC() {
    this.showBCC = !this.showBCC;
  }

  checkValue(x) {
    if(x === 'A') {
      this.body = this.body + '<br/>' + this.jobSignature;
    } else {
      this.body = this.defaultComments;
    }
  }

  add(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.validateEmail(event.value.trim())) {
        this.emailList.push({ value: event.value.trim(), invalid: false });
      } else {
        this.emailList.push({ value: event.value, invalid: true });
        this.rulesForm.controls['emails'].setErrors({'incorrectEmail': true});
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  addcc(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.ccvalidateEmail(event.value.trim())) {
        this.ccemailList.push({ value: event.value.trim(), invalid: false });
      } else {
        this.ccemailList.push({ value: event.value, invalid: true });
        this.ccrulesForm.controls['CCemails'].setErrors({'incorrectEmail': true});
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  addbcc(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.bccvalidateEmail(event.value.trim())) {
        this.bccemailList.push({ value: event.value.trim(), invalid: false });
      } else {
        this.bccemailList.push({ value: event.value, invalid: true });
        this.bccrulesForm.controls['BCCemails'].setErrors({'incorrectEmail': true});
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }


  removeEmail(data: any): void {
    console.log('Removing ' + data)
    if (this.emailList.indexOf(data) >= 0) {
      this.emailList.splice(this.emailList.indexOf(data), 1);
    }
    this.rulesForm.controls['emails'].setErrors({'incorrectEmail': false});
  }

  removeEmailc(data: any): void {
    console.log('Removing ' + data)
    if (this.ccemailList.indexOf(data) >= 0) {
      this.ccemailList.splice(this.ccemailList.indexOf(data), 1);
    }
    this.ccrulesForm.controls['CCemails'].setErrors({'incorrectEmail': false});
  }

  removeEmailbc(data: any): void {
    console.log('Removing ' + data)
    if (this.bccemailList.indexOf(data) >= 0) {
      this.bccemailList.splice(this.bccemailList.indexOf(data), 1);
    }
    this.bccrulesForm.controls['BCCemails'].setErrors({'incorrectEmail': false})
  }

  showClear()
  {
    this.bccemailList = [];
    this.bccemailList = [];
  }

  private validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  private ccvalidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  private bccvalidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  GetCustomerSubscription() {
    return this.appService.GetCustomerSubscription(this.customerName.UserId).subscribe(res => {
      if (res != null) {
        this.subdetails = res;
        this.GetSubscriptionDetails(res.subscriptionId);
        // this.GetInvoiceEstimates();
        // this.GetUnbilledChargeDetails();
      }

    });
  }

  GetSubscriptionDetails(sid) {
    return this.appService.GetSubscriptionDetails(sid).subscribe(res1 => {
      if (res1 != null) {
        this.sdetails = res1;
      }
      else {
        this.sdetails.planId = '0';
      }
    });
  }

  UserCheck(ProfileId) {
    this._service.GetService('IdentityAPI/api/GetCandidateUserRoleByProfileId?profileId=', this.data.profileId).subscribe(
      res => {
        this.UserRoleId = res.UserRoleId;
        this.UserId = res.UserId;
      });
  }

  sendEmail() {

    this.isSendingEmail = true;
    //this.spinner.show();
    this.conversation.FromID = this.customerName.Email;
    this.conversation.FullName = this.data.firstname + this.data.lastname;
    this.conversation.Subject = this.subject;
    this.conversation.CCEmailAddress = this.ccemailList.map(x => x.value).toString();
    this.conversation.ToEmailID = this.emailList.map(x => x.value).toString();
    this.conversation.BCCEmailAddress = this.bccemailList.map(x => x.value).toString();
    this.conversation.Body = this.body;
    // if(){
    if (this.data.profileUpload === false || this.data.profileUpload === undefined) {
      if (this.UserId > 0) {
        this.conversation.AppLink = this.settingsService.settings.CandidateLogin + ';lid=' + this.data.ccpid;
      }
      else {
        if (this.sdetails.planId != "enterprise" || this.sdetails.planId === undefined) {
          this.conversation.AppLink = this.settingsService.settings.NewCandidateSignUp + ';sid=' + this.data.ccpid + ';jId=' + this.data.jobId;
        }
        else
        {
          this.conversation.AppLink = this.settingsService.settings.CandidateSignUp + ';Cid=' + this.data.CustomerId + ';sid=' + this.data.ccpid;
        }
      }
    }
    if (this.data.profileUpload === true) {
      if (this.sdetails.planId != "enterprise" || this.sdetails.planId === undefined) {
        if (this.UserId > 0) {
          this.conversation.AppLink = this.settingsService.settings.CandidateLogin + ';lid=' + this.data.ccpid;
        }
        else {
          this.conversation.AppLink = this.settingsService.settings.NewCandidateSignUp + ';sid=' + this.data.ccpid + ';jId=' + this.data.jobId;
        }

      }
      if (this.sdetails.planId === "enterprise") {
        if (this.UserId > 0) {
          this.conversation.AppLink = this.settingsService.settings.CandidateLogin + ';lid=' + this.data.ccpid;
        }
        else {
          this.conversation.AppLink = this.settingsService.settings.CandidateSignUp + ';Cid=' + this.data.CustomerId + ';sid=' + this.data.ccpid;
        }
      }



    }
    this.conversation.UserCheck = this.data.userId > 0 ? 'Login' : 'Yes I will Join';
    // }

    this.jobdetailsservice.StartConversation(this.conversation).subscribe(data => {

      if (data === 0) {
        this.jobdetailsservice.UpdateStatusOnEmailConversation(this.emailUpdate).subscribe(data1 => {
        });

        //this.spinner.hide();
        this.isSendingEmail = false;
        this.dialogRef.close();
        this.emailList=[];
        this.toastr.success('Mail Sent', 'Success');
        setTimeout(() => {
          this.toastr.dismissToast;
        }, 3000);
        this.conversation.FullName = '';
        this.conversation.Subject = '';
        this.conversation.Body = '';
        this.conversation.ToEmailID = '';
        this.mailbox = false;
      }
    
    },
      error => {
        this.isSendingEmail = false;
      },
      () => {
        this.isSendingEmail = false;
      });

  }

  Check() {
    this._service.GetService('ProfileAPI/api/GetProfileStatus?profileId=', this.data.profileId).subscribe(
      data => {
        let apiData = data;
        this.isPublicAvailable = apiData.isPublicAvailable;
      });
  }

  EditMail() {
    this.ToEmailID = this.data.EmailId;

  }
}

export class StartConversation {
  FullName: string;
  Subject: string;
  Body: string;
  ToEmailID: string;
  FromID: string;
  ApplicationName: string;
  AppLink: string;
  UserCheck: string;
  CCEmailAddress: string;
  BCCEmailAddress: string;
}
export class EmailUpdateStatus {
  JobResponseId: number;
  ProfileId: number;
  JobId: number;
  ResumeId: number;
  ResponseStatusId: number;
}
