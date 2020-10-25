import { ApiProperty } from '@nestjs/swagger';
import { SESSION_STATUSES } from '@common/index';

export class Session {
  @ApiProperty({
    title: 'Session ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Customer ID',
    example: '7315F39A-CBE5-48D0-BD8C-26E4F8B8A4D2',
    description: 'Unique Identifier',
  })
  readonly customer_id: string;

  @ApiProperty({
    title: 'Reference ID',
    example: '1D3526A7-2ACC-408F-8E7D-3CDD87571D26',
    description: 'Unique Identifier',
  })
  readonly reference_id: string;

  @ApiProperty({
    title: 'Fido Registration Request ID ',
    example: '1D3526A7-2ACC-408F-8E7D-3CDD87571D26',
    description: 'Unique Identifier',
  })
  readonly fido_reg_req_id: string;

  @ApiProperty({
    title: 'Fido Registration Response',
    example:
      '[{"header":{"upv":{"major":1,"minor":0},"op":"Reg","serverData":"e68f8cd6-6f03-4a00-9dd5-1f5d1b48ce0b","exts":[{"id":"com.daon.sdk.envCheck","data":"true","fail_if_unknown":false},{"id":"com.daon.sdk.deviceInfo","data":"true","fail_if_unknown":false},{"id":"com.daon.sdk.location","data":"true","fail_if_unknown":false},{"id":"com.daon.sdk.healthCheck","data":"true","fail_if_unknown":false},{"id":"com.daon.sdk.ados.decChain","data":"[\\"MIIE2TCCAsOgAwIBAgIRAKXizsHD501UrMkfbG3-Mc8wCwYJKoZIhvcNAQELMEcxFTATBgNVBAMMDElkZW50aXR5WCBDQTENMAsGA1UECgwERGFvbjESMBAGA1UECwwJSWRlbnRpdHlYMQswCQYDVQQGEwJJRTAeFw0yMDA1MTQwODIyNTFaFw0zMDA1MTQwODIyNTFaMFoxDTALBgNVBAoMBERhb24xEjAQBgNVBAsMCUlkZW50aXR5WDELMAkGA1UEBhMCSUUxKDAmBgNVBAMMH0RFX0RBT05fQVVUSEVOVElDQVRJT05fREFUQV9LRUswggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCNP3bo_ToBu0dKR9A9c3DzakSxql4vGiPIgWAlABUN0TRHi1CXu_vf5sdp44bPk4Nc_G_0VM-ZwY7dqHmpkMVsD5xSXkM2-O98BIJJ9GsG44aT8fyLHDePQ8yctfndX7xGqTMQiogc67LPZBGmx_G_7F8PpytKSMcVQkvQAR6UMeA6wbFoCC7TxGruSfDlDNBOk0JOqwrOLg44GW3vZhxMn43mie-ARlG-e86WyxY-BIWNajEqjZP3jn_jsUYJ7ltCI1-7ZW_jZpi4BXU2yTKnZnxCxN2AzBQIhWc2EUnxvdPJJHjpZbE1EzCaijCTlcty3a7PYrRtvxz_g1I1VaUBAgMBAAGjgbAwga0wfgYDVR0jBHcwdYAUZplSSlDw67i7wEa-1wVzqzvdL5ahS6RJMEcxFTATBgNVBAMMDElkZW50aXR5WCBDQTENMAsGA1UECgwERGFvbjESMBAGA1UECwwJSWRlbnRpdHlYMQswCQYDVQQGEwJJRYIQKuhll9ePQGSsywpelEVwazAdBgNVHQ4EFgQUbhXzN3VeyJ8V_UePc8FtWJ4VELkwDAYDVR0TAQH_BAIwADALBgkqhkiG9w0BAQsDggIBAI9rAsZ_JsAtuGSGT0oQ8acIRRw9kFpYvVwsIeX9KLx-5KLX4ppKH8lYQ6ZfpjsCU8DykIHsb_Cq597bo7fmbM9J1NN5N9OCHRMAsHDurRUnaYl4asGbBV1CwhVXqE3y9sGp3XquhvqiCa5tS3y3Qqlk8OWiO8WRPIhBbwyoYvcxiP8CrA0uzUOo3HZ_UDEGuSVdjvwgoKV7VQzx8C4sDeTllf34Qex2mDOZT_TN9OPQSjuNhpJ3MU6T-Ane4IPRYltObD3BTeYsDjDVuYLQOcl5FOYNWUyl6UO8SIKhdmmK56xd3bEqa3_bfrgvrOztvtlo6wnnVgncuq5slmibK4n9e6j9Zv2wBgz_wIHLR5tWdpHVHVUyzOWIPO9BC0Cc538qEF-tqqN007_ZsTfngQhf_lrCUyb1ScZN1nn91_E69ATAz38VvKAoTplDm_zf3-spPU3G05zpUb7H9VX2rWhyLh4mkYR59-psZoDT4ExqoYyxOt-bCyBAVkaax73wiADBTDW-E9-gff1JxwNKnjYQO6ObJzPbE3YUTq1gi04IoVAwoYVejmMhVM_gFeDHqY03YHJ9_GhM-nO3AYb1OfsKA0tAtN7i23cYG8FbyLUq_8QvY8fbt-FS7zAzsv4CefongcagNWbZolN-8tmzk-qX26XJ2PWhRHR9S3xZGkfj\\"]","fail_if_unknown":false},{"id":"com.daon.sdk.ados.dekId","data":"2014","fail_if_unknown":false},{"id":"com.daon.authRequest.retriesRemaining","data":"5","fail_if_unknown":false},{"id":"com.daon.authRequest.maxAttempts","data":"5","fail_if_unknown":false},{"id":"com.daon.user.retriesRemaining","data":"10","fail_if_unknown":false},{"id":"com.daon.user.maxAttempts","data":"10","fail_if_unknown":false},{"id":"com.daon.face.retriesRemaining","data":"3","fail_if_unknown":false},{"id":"com.daon.face.maxAttempts","data":"3","fail_if_unknown":false},{"id":"com.daon.voice.retriesRemaining","data":"3","fail_if_unknown":false},{"id":"com.daon.voice.maxAttempts","data":"3","fail_if_unknown":false},{"id":"com.daon.passcode.retriesRemaining","data":"3","fail_if_unknown":false},{"id":"com.daon.passcode.maxAttempts","data":"3","fail_if_unknown":false},{"id":"com.daon.otp.retriesRemaining","data":"3","fail_if_unknown":false},{"id":"com.daon.otp.maxAttempts","data":"3","fail_if_unknown":false},{"id":"com.daon.identityx.version","data":"5.0.2.4","fail_if_unknown":false},{"id":"com.daon.D409#8201.ados.mode","data":"enrol","fail_if_unknown":false},{"id":"com.daon.D409#9201.ados.mode","data":"enrol","fail_if_unknown":false}]},"challenge":"yczFcjqeQscyJPwZJrLVjA","username":"e68f8cd6-6f03-4a00-9dd5-1f5d1b48ce0b","policy":{"accepted":[[{"aaid":["D409#8201"]}],[{"aaid":["D409#9201"]}]]}}]',
    description: 'Fido response object',
  })
  readonly fido_reg_req: string;

  @ApiProperty({
    enum: SESSION_STATUSES,
    example: SESSION_STATUSES[0],
    description: 'Status of the session.',
    required: false,
  })
  status?: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  created_on?: Date;

  @ApiProperty({ required: false })
  created_by?: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  updated_on?: Date;

  @ApiProperty({ required: false })
  updated_by?: string;
}
