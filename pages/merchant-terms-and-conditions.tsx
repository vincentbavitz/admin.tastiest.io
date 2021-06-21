/* eslint-disable no-irregular-whitespace */
import { BrandIcon } from '@tastiest-io/tastiest-icons';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { v4 as uuid } from 'uuid';
import { METADATA } from '../constants';

const definitions: IDefinition[] = [
  {
    term: 'Tastiest',
    definition:
      'Tastiest Technologies Ltd (registered with company number 12755129)',
  },
  {
    term: 'Merchant',
    definition:
      'the company providing the Merchant Offering and agreeing to be bound to this Agreement.',
  },
  {
    term: 'Merchant Offering',
    definition:
      'the goods and/or services to be provided by the Merchant, stated in the Offer as presented by Merchant. Values agreed by Tastiest and Merchant.',
  },
  {
    term: 'Amount Paid',
    definition: (
      <span>
        the amount a purchaser pays to Tastiest for each Offer.{' '}
        <span className="font-medium">“Offer Expiration Date”</span> means the
        date stated on which the Offer expires (if there is an expiration date).
      </span>
    ),
  },
  {
    term: 'Remittance Amount',
    definition:
      '75% of the Amount Paid which Tastiest shall remit to Merchant for each Offer minus any additional fees, subject to the payment terms.',
  },
  {
    term: 'Fine Print',
    definition:
      'the conditions and restrictions concerning Offer redemption and the Merchant Offering stated on the Website and App',
  },
  {
    term: 'Offer',
    termAlternate: 'Offers',
    definition:
      'the offer for the products and/or services Tastiest is authorized to promote and sell on the Merchant’s behalf at a price agreed with the Merchant.',
  },
  {
    term: 'Admin Panel',
    definition:
      'the page on Tastiest’s app and/or website which Merchant’s have access to in order to mark offers as complete and manage their Tastiest page.',
  },
  {
    term: 'Storyboard',
    definition:
      'a document created by Tastiest which contains requirements and directions for the creation of promotional material.',
  },
  {
    term: 'Data Protection Legislation',
    definition: (
      <ol style={{ listStyleType: 'lower-alpha' }} className="ml-6 font-bold">
        <li>
          <span className="font-normal">
            any law, statute, declaration, decree, directive legislative
            enactment, order, ordinance, regulation, rule or other binding
            restriction which relates to the protection of individuals with
            regards to processing of personal data to which a party is subject,
            including Data Protection Act 2018 and Regulation 2016/679 (
            <span className="font-medium">“GDPR”</span>) or all legislation
            enacted in the UK in respect of the protection of personal data; and
          </span>
        </li>
        <li>
          <span className="font-normal">
            any code of practice or guidance published by the UK Information
            Commissioner’s Office from time to time.
          </span>
        </li>
      </ol>
    ),
  },
];

interface SectionTerm {
  label?: string;
  text: string | ParagraphElement;
  children?: SectionTerm[];
  suffix?: SectionTerm;
}

interface ISection {
  title: string;
  pretext?: string | ParagraphElement;
  postText?: string | ParagraphElement;
  sectionTerms: SectionTerm[];
}

const sections: ISection[] = [
  {
    title: 'Offer Program',
    sectionTerms: [
      {
        text:
          'Tastiest is authorized to promote and sell Offers on Merchant’s behalf subject to the terms of this Agreement. The Offer will evidence the Merchant Offering and will be sent to the purchaser electronically once payment is received. The purchaser will then redeem the Offer by making a reservation with the Merchant, attending the Merchant’s restaurant and referring to the Offer they have purchased through Tastiest. Merchant is the provider of the Merchant Offering.',
      },
      {
        text:
          'Tastiest is authorized to promote and sell Offers on Merchant’s behalf through any platform, including its website, app, affiliates, business partner network, marketplace, or referral network. The Offers may be offered to all or part of Tastiest’s subscriber base or its affiliate subscriber base or referral network and segmented by various variables including gender, age, location, and consumer preferences. The features may be offered through a variety of distribution channels, including, the Internet, the Website, affiliate websites, business partner network, email, mobile applications, other types of electronic offerings and other platforms or distribution channels owned, controlled, or operated by Tastiest, its affiliates or business partners. In addition, in connection with Tastiest’s promotion of a Merchant Offering, Merchant authorizes Tastiest to shorten or extend the Offer Expiration Date.',
      },
      {
        text:
          'Tastiest may require that Merchant provide Tastiest with a calendar of available reservation times and allow Tastiest purchasers to schedule reservations with the Merchant through Tastiest and any third party service Tastiest may use. Tastiest may audit Merchant response times using various methods, including but not limited to, auto-dialers, call forwarding and pre-recorded calls. If Tastiest, in its sole discretion, determines Merchant response times or the quality of service provided to purchasers is unsatisfactory, Tastiest may terminate the Agreement and return the Amount Paid to purchasers for unredeemed Offers.',
      },
      {
        text:
          'If Merchant performs background checks on its employees, agents and/or independent contractors performing services, Merchant shall provide the results of such background checks to Tastiest upon request. Merchant shall obtain the necessary consent to share with Tastiest the results requested.',
      },
      {
        text:
          'Merchant shall promptly notify Tastiest any time it receives a complaint related to potentially criminal conduct, including allegations of sexual assault, allegedly engaged in by any of its employees, agents or independent contractors, regardless of whether a Tastiest customer makes the complaint.',
      },
      {
        text:
          'The Offers shall be agreed between Tastiest and Merchant prior to any promotion or sale by Tastiest. Tastiest is authorized to add an additional discount of up to 50% on the Offers in Tastiest’s sole discretion. ',
      },
      {
        text:
          'Merchant agrees to provide the Offers exclusively through the Tastiest website or app. Merchant will not provide the agreed Offers to any customer who has not redeemed the Offer through the Tastiest website or app. Any customers or purchasers looking to redeem an Offer must be directed to purchase it through the Tastiest.',
      },
      {
        text:
          'Tastiest reserves the continuing right to reject, revise, or discontinue any Merchant Offering, at any time and for any reason in Tastiest’s sole discretion, and to terminate the Merchant Offering and to remove all references to the Merchant Offering and Offers from the Website or app; and redirect or delete any URL used in connection with the Merchant Offering.',
      },
      {
        text:
          'Merchant shall honour the Offers for the Merchant Offering up to the Offer Expiration Date. After the Offer Expiration Date, merchant agrees to fulfil the Offer for the Amount Paid indefinitely.',
      },
      {
        text:
          'After the Offer Expiration Date, Merchant must always allow the purchaser to redeem the Offer for the Amount Paid for the Merchant Offering. If the goods and services constituting the Merchant Offering and stated in the Offer are no longer available, the Merchant must always allow the purchaser to redeem alternative goods or services which are at least of equivalent value to the Amount Paid.',
      },
      {
        text:
          'Merchant agrees that in providing the Merchant Offering, Merchant will not inflate prices or impose any additional fees, charges, conditions or restrictions that contradict or are inconsistent with the terms stated on the Offers, including the Fine Print. Unless disclosed in the Fine Print, Merchant further agrees not to impose different terms or a different cancellation policy than what is imposed on its non-Tastiest customers.',
      },
      {
        text:
          'Merchant agrees that so long as an appointment or reservation is made to redeem an Offer, or purchaser has made an attempt to make a reservation, before the Offer Expiration Date, the Offer will be honoured fully and without restriction, even though the services may be provided after the Offer Expiration Date.',
      },
      {
        text:
          'Merchant is responsible for all customer service in connection with the Merchant Offering and for supplying all goods and services stated in the Merchant Offering. Merchant is also responsible for any customer loyalty programs associated with the Merchant Offering.',
      },
      {
        text:
          'If applicable, Merchant will hold the Merchant Offering for pick-up by each purchaser at the Redemption Site. The “Redemption Site” is the complete and accurate address provided by Merchant to Tastiest where purchasers are able to redeem the Offer and receive the Merchant Offering. Merchant also agrees to provide Tastiest with the hours and dates of operation, complete with any exceptions, and a valid phone number for the Redemption Site. If any of the information related to a Redemption Site changes, Merchant agrees to notify Tastiest immediately of such change.',
      },
      {
        text:
          'Merchant agrees to provide a replacement or alternative of equivalent value to the Merchant Offering if the Merchant Offering delivered to the purchaser is in any way defective or nonconforming. The Merchant will provide this regardless of whether the purchaser is refunded by Tastiest. ',
      },
    ],
  },
  {
    title: 'Payment',
    sectionTerms: [
      {
        text:
          'Amounts retained by Tastiest from the proceeds of the Merchant Offering are compensation to Tastiest for marketing, promoting, and advertising the Merchant Offering and distributing the Offers on behalf of Merchant. Tastiest shall retain the Remittance Amount for the benefit of purchasers holding unredeemed Offers until the Merchant delivers the Merchant Offering.  The funds held shall then be remitted to the Merchant after the Merchant Offering has been delivered and the Merchant confirms on the Admin Panel that the purchaser has attended redeemed the Offer and received the Merchant Offering. If a Merchant confirms on the Admin Panel that the purchaser has received the Merchant Offering when they have not, that will constitute a material breach of this Agreement.',
      },
      {
        text:
          'Upon successful completion of the Merchant Offering Tastiest shall pay the Remittance Amount to the Merchant within 30 days of the Merchant confirming completion of the Merchant Offering on the Admin Panel.  The Remittance Amount shall be paid to the Merchant in a method chosen by Tastiest using the details provided by the Merchant. Tastiest reserves the right to deduct extra funds from payments due to the Merchant in order to refund purchasers if they request a refund or otherwise complain about the Merchant Offering. Purchasers who purchase an Offer through the Tastiest website or app shall be refunded at the sole discretion of Tastiest.',
      },
      {
        text:
          'Merchant will accept the amounts received from Tastiest as payment in full for all services provided by Merchant delivered pursuant to the Merchant Offering. Merchant is solely responsible for complying with any contractual requirements imposed by its contracts with Third-Party Payors, including but not limited to requirements related to offering discounted services.',
      },
      {
        text:
          'Tastiest also reserves the right to deduct any such amounts from payments due to the Merchant to cover any costs or associated costs of processing payments from purchasers including but not limited to: credit card fees, payment gateway fees, Paypal fees.',
      },
      {
        text:
          'It is the Merchant’s responsibility to determine what, if any, taxes apply to the payments Merchant receives from Tastiest and it is Merchant’s responsibility to collect, report and remit the correct tax to the appropriate tax authority. Tastiest is not responsible for determining whether taxes apply to Merchant’s transaction with Tastiest, or for collecting, reporting or remitting any taxes arising from any transaction with or by Merchant and purchaser. Merchant may be asked to provide Tastiest with a valid Tax number for tax reporting purposes. Notwithstanding anything else in this Agreement, Merchant shall be, and will remain, registered for sales, use and other similar tax collection purposes in all localities in which Merchant is required to be so registered in connection with the Merchant Offering and pursuant to the terms and redemption of the Offer, and shall be responsible for paying any and all sales, use or any other taxes related to the Merchant Offering or the goods and services.',
      },
      {
        text:
          'Transaction Taxes. Merchant bears sole financial responsibility for any and all sales, use, or other similar taxes applicable to their business, including any interest penalties and additions related thereto, imposed on or arising from the transactions contemplated by this Agreement between Tastiest and Merchant (“Transaction Taxes”), if any. Tastiest shall have no obligation to pay any Transaction Taxes applicable to the Merchant.',
      },
      {
        text:
          'Withholding Taxes. Tastiest may be required by tax authorities to withhold taxes on behalf of Merchant. Tastiest reserves the right to deduct any such taxes from amounts due to Merchant and to remit them to the appropriate tax authority. Tastiest may also be required to report the withholding tax payments to the tax authorities. Tastiest shall provide evidence of payment of withholding taxes to Merchant no later than 60 days after payment of the withholding taxes.',
      },
      {
        text:
          'Notwithstanding anything to the contrary, Tastiest will have no obligation to advance amounts that have been paid to Tastiest by a purchaser until Merchant has complied with Merchant’s obligations under this Agreement. If Tastiest reasonably believes that Merchant has breached any provision of this Agreement, Tastiest may offset, delay, withhold, or suspend future payments to Merchant, in Tastiest’s sole discretion. In addition, if Merchant is unwilling to, or in Tastiest’s reasonable discretion appears unable to, perform its obligations under this Agreement, Tastiest is authorized to offset, delay, withhold, or suspend future payments to Merchant in addition to such other remedies as may be available under this Agreement or at law, to secure payment from Merchant for any refunds and/or other amounts payable by Merchant under this Agreement.',
      },
      {
        text:
          'Tastiest reserves the right to withhold any Remittance Amount for up to 180 days if a Merchant’s satisfaction rating falls below 70% on the Tastiest app or website.',
      },
    ],
  },
  {
    title: 'Data Protection',
    sectionTerms: [
      {
        text: (
          <p>
            <span className="font-bold">“Customer Data”</span> means all
            identifiable information about purchasers generated or collected by
            Tastiest or Merchant, including, but not limited to, purchasers’
            name, shipping addresses, email addresses, phone numbers, purchaser
            preferences and tendencies, and financial transaction data.
          </p>
        ),
      },
      {
        text:
          'Merchant shall use Customer Data only to fulfil its redemption obligations in connection with the Merchant Offering as authorized by this Agreement. Merchant expressly agrees that any Customer Data shall be used only for this purpose (including, but not limited to, the redemption of Offers and provision of goods and services to purchasers), and not to enhance a file or list owned by Merchant, or any third party. Merchant represents, warrants and covenants that it will not resell, broker or otherwise disclose any Customer Data to any third party, in whole or in part, for any purpose, unless required by applicable law. If Merchant engages any third party to facilitate its redemption obligations hereunder, Merchant shall ensure that such third party implements appropriate organisational and technical measures and complies with Data Protection Legislation in handling any Customer Data. If any Customer Data is collected directly by Merchant or a third party engaged by Merchant to facilitate its redemption obligations hereunder, Merchant shall ensure that it or such third party adopts appropriate organisational and technical measures and processes the Customer Data in conformity with its posted privacy policy and all Data Protection Legislation.',
      },
      {
        text:
          'As long as Merchant uses Customer Data in compliance with applicable law and Merchant’s posted privacy policy, restrictions stated in this Agreement on Merchant’s use of Customer Data do not apply to: (i) data from any purchaser who is already a customer of Merchant before the Effective Date, if such data was provided to Merchant by such purchaser independent of this Agreement or any transaction hereunder; or (ii) data supplied by a purchaser directly to Merchant who becomes a customer of Merchant in connection with such purchaser explicitly opting in to receive communications from Merchant.',
      },
      {
        text:
          'Merchant shall immediately notify Tastiest if Merchant becomes aware of or suspects any unauthorized access to or use of Customer Data or any confidential information of Tastiest, and shall cooperate with Tastiest in the investigation of such breach and the mitigation of any damages. Merchant will bear all associated expenses incurred by Tastiest to comply with applicable laws (including, but not limited to, any data breach laws) or arising from any unauthorized access or acquisition of Customer Data while such data is in Merchant’s reasonable possession or control. Upon termination or expiration of this Agreement, Merchant shall, as directed by Tastiest, destroy or return to Tastiest all the Customer Data in Merchant’s or any agent of Merchant’s possession.',
      },
      {
        text:
          'The parties will comply with all applicable requirements of the Data Protection Legislation in performing their respective obligations under this Agreement, including but not limited to in respect of:',
        children: [
          {
            text:
              'Any personal data processed by the parties in connection with the Agreement',
          },
          {
            text:
              'Transfers of any personal data processed by the parties in connection with the Agreement to any third party third country or an international organisation; and',
          },
          {
            text:
              'The parties’ respective security obligations under Article 32 of GDPR',
          },
        ],
      },
      {
        text: '',
      },
    ],
  },
  {
    title: 'Promotional Programs',
    pretext: (
      <p>
        In an effort to incentivize Offer sales, Merchant authorizes Tastiest,
        at any time and in Tastiest’s sole discretion, to increase or decrease
        the Amount Paid for the Merchant Offering (any such effort,{' '}
        <span className="font-bold">“Promotional Program(s)”</span>). For each
        Offer sold as part of a Promotional Program, the Net Remittance Amount
        may be adjusted in an amount equal to the percentage increase or
        decrease in the Amount Paid (
        <span className="font-bold">“Promotional Adjustment”</span>), provided
        that, any decrease of the Net Remittance Amount will not exceed: (i) if
        applicable, the maximum Promotional Adjustment specified in the “Payment
        Terms” section of the Tastiest Merchant Agreement. <br />
        Promotional Programs include the following:
      </p>
    ),
    sectionTerms: [
      {
        text: (
          <p>
            Promotional Codes – A 
            <span className="font-bold">“Promotional Code”</span> is a code that
            purchasers may use, in Tastiest’s sole discretion, to receive a
            discount on the Amount Paid for a Merchant Offering.
          </p>
        ),
      },
      {
        text: (
          <p>
            Price Optimization – 
            <span className="font-bold">“Price Optimization”</span> is any
            change (excluding Promotional Codes) to the Amount Paid for a
            Merchant Offering.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Term and Termination',
    sectionTerms: [
      {
        text:
          'This Agreement shall continue in effect until terminated by either party in accordance with this Section (“Term”). Tastiest is authorized to terminate this Agreement, at any time for any reason, upon giving written notice to Merchant. Merchant is authorized to terminate this Agreement only by giving three (3) months’ prior written notice to Tastiest.',
      },
      {
        text:
          'The Merchant’s three month notice period may only be given if the Merchant is open to the public for business. If at any point during the three month notice period the Merchant’s business is closed due to any covid-19 related issue or government mandate then the three month notice period shall be temporarily suspended for the duration of closure. The three month notice period will only continue once the Merchant’s business is re-opened to the public.',
      },
      {
        text:
          'Termination of this Agreement will not in any way affect Merchant’s obligation to complete any Offer according to the terms of this Agreement, including the obligation to honour the Offer for the Amount Paid after the Offer Expiration Date. Provisions in this Agreement that are intended to survive termination will continue in full force and effect after the Term.',
      },
      {
        text:
          'The termination of this Agreement (however arising) will be without prejudice to any rights and remedies, which may have accrued to either party. Any conditions which impliedly have effect after termination will continue to be enforceable notwithstanding termination.',
      },
    ],
  },
  {
    title: 'Compliance with Applicable Laws',
    pretext: (
      <p>
        Merchant agrees to comply with the Offer terms and conditions as stated
        on the Website and/or app, including but not limited to the{' '}
        <a
          href="https://tastiest.io/terms"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline"
        >
          “Terms of Use”
        </a>
        , and to ensure that the Offers comply with all laws that govern offers,
        vouchers, gift cards, coupons, and gift certificates and any laws
        governing the imposition of expiration dates, service charges or
        dormancy fees and all Fine Print related to the Merchant Offering stated
        in the Offer. Upon written request from Merchant, but only when
        required, Tastiest will provide Merchant with information in Tastiest’s
        possession that the Merchant needs to comply with its obligations under
        this Agreement.
      </p>
    ),
    sectionTerms: [],
  },
  {
    title: 'Marketing and Promotion',
    sectionTerms: [
      {
        text:
          'Tastiest and its business partners may communicate with Merchant with regard to products, promotions, and other services that may be of interest to Merchant. This may include email or other communications. Tastiest may also solicit Merchant’s opinion for market research purposes.',
      },
      {
        text:
          'The Merchant agrees to co-operate with and assist Tastiest and any videographer, photographer or other individual appointed by Tastiest in the creation of a Storyboard and any promotional material to be used for marketing the Offer.',
      },
      {
        text:
          'The Merchant agrees to follow the Storyboard created by Tastiest or anyone appointed by Tastiest and the Merchant will provide and make available any individuals, products, services or anything else required to comply with the Storyboard on the date set by Tastiest.',
      },
      {
        text:
          'If the Merchant fails to provide and make available anything required to comply with the Storyboard on the date set, Tastiest may withdraw an additional amount from any future Remittance Amount up to the value of £300 to cover the time lost in the Merchant’s failure to comply with the Storyboard.',
      },
    ],
  },
  {
    title: 'Intellectual Property Rights',
    sectionTerms: [
      {
        text: (
          <p>
            Merchant grants to Tastiest a non-exclusive, worldwide, royalty
            free, paid-up, perpetual, irrevocable, transferable and
            sub-licensable license and right to use, modify, reproduce,
            sublicense, publicly display, distribute, broadcast, transmit,
            stream, publish and publicly perform:
          </p>
        ),
        children: [
          {
            text: (
              <p>
                Merchant’s name, logos, trademarks, service marks, domain names,
                and any audiovisual content, video recordings, audio recordings,
                photographs, graphics, artwork, text and any other content
                provided, specified, recommended, directed, authorized or
                approved to use by Merchant (collectively, {' '}
                <span className="font-bold">“Merchant IP”</span>); and
              </p>
            ),
          },
          {
            text: (
              <p>
                any third party’s name, logos, trademarks, service marks, domain
                names, audiovisual recordings, video recordings, audio
                recordings, photographs, graphics, artwork, text and any other
                content provided, specified, recommended, directed, authorized
                or approved for use by Merchant (collectively, 
                <span className="font-bold">“Third Party IP”</span>), in each
                case in connection with the promotion, sale/resale (as may be
                applicable) or distribution of the Merchant Offering in all
                media or formats now known or hereinafter developed (“License”).
              </p>
            ),
          },
          {
            text: (
              <p>
                Any use of the Merchant IP or Third Party IP as contemplated in
                this Agreement is within Tastiest’s sole discretion.
              </p>
            ),
          },
        ],
      },
      {
        text: '',
        children: [
          {
            text: (
              <p>
                Merchant acknowledges and agrees that, as between the parties,
                Tastiest owns all interest in and to the Website, App, Customer
                Data, Tastiest trade names, logos, trademarks, service marks,
                domain names, social media identifiers, all data collected
                through or from the Website or App, all audiovisual content,
                video recordings, audio recordings, photographs, graphics,
                artwork, text or any other content created by Tastiest or at
                Tastiest’s direction including content created for the promotion
                of the Merchant or Offers, or assigned to Tastiest, and any
                materials, software, technology or tools used or provided by
                Tastiest to promote, sell/resell (as may be applicable) or
                distribute the Merchant Offering and conduct its business in
                connection therewith (collectively “Tastiest IP”).
              </p>
            ),
          },
          {
            text: (
              <p>
                Merchant shall not use, sell, rent, lease, sublicense,
                distribute, broadcast, transmit, stream, place shift, transfer,
                copy, reproduce, download, time shift, display, perform, modify
                or timeshare the Tastiest IP or any portion thereof, or use such
                Tastiest IP as a component of or a base for products or services
                prepared for commercial use, sale, sublicense, lease, access or
                distribution, except that Tastiest grants Merchant a limited,
                non-exclusive, revocable, non-transferable, non-sub licensable
                licence during the Term to use Tastiest IP. The Tastiest IP may
                only be used for the purpose and with the stipulations stated by
                Tastiest when granting the licence.
              </p>
            ),
          },
          {
            text: (
              <p>
                Merchant shall keep the Tastiest IP confidential, and shall not
                prepare any derivative work based on the Tastiest IP or
                translate, reverse engineer, decompile or disassemble the
                Tastiest IP.
              </p>
            ),
          },
          {
            text: (
              <p>
                Merchant shall not take any action to challenge or object to the
                validity of Tastiest’s rights in the Tastiest IP or Tastiest’s
                ownership or registration thereof. Except as specifically
                provided in this Agreement, Merchant and any third party
                assisting Merchant with its obligations in this Agreement, are
                not authorized to use Tastiest IP in any medium without prior
                written approval from an authorized representative of Tastiest.
              </p>
            ),
          },
          {
            text: (
              <p>
                Merchant shall not include any trade name, trademark, service
                mark, domain name, social media identifier, of Tastiest or its
                affiliates, or any variant or misspelling thereof, in any
                trademark, domain name, email address, social network
                identifier, metadata or search engine keyword.
              </p>
            ),
          },
          {
            text: (
              <p>
                Merchant shall not use or display any Tastiest IP in a manner
                that could reasonably imply an endorsement, relationship,
                affiliation with, or sponsorship between Merchant or a third
                party and Tastiest. All rights to the Tastiest IP not expressly
                granted in this Agreement are reserved by Tastiest.
              </p>
            ),
          },
        ],
      },
      {
        text: (
          <p>
            If Merchant provides Tastiest or any of its affiliates with
            feedback, suggestions, reviews, modifications, data, images, text,
            or other information or content about a Tastiest product or service
            or otherwise in connection with this Agreement, any Tastiest IP, or
            Merchant’s participation in the Merchant Offering or Offer,
            (collectively, <span className="font-bold">“Feedback”</span>),
            Merchant irrevocably assigns to Tastiest all right, title, and
            interest in and to Feedback. In the event your assignment to
            Tastiest is invalid for any reason, you hereby irrevocably grant
            Tastiest and its affiliates a perpetual, paid-up, royalty-free,
            nonexclusive, worldwide, irrevocable, freely transferable right and
            license to:
          </p>
        ),
        children: [
          {
            text: 'use, reproduce, perform, display, and distribute Feedback;',
          },
          {
            text:
              'adapt, modify, re-format, and create derivative works of Feedback for any purpose and sublicense the foregoing rights to any other person or entity',
          },
        ],
        suffix: {
          text: 'Merchant warrants that:',
          children: [
            {
              text:
                'Feedback is Merchant’s original work, or Merchant obtained Feedback in a lawful manner; and',
            },
            {
              text:
                'Tastiest and its sub licensees’ exercise of rights under the licence above will not violate any person’s or entity’s rights, including any copyright rights. Merchant agrees to provide Tastiest such assistance as Tastiest might require to document, perfect, or maintain Tastiest’s rights in and to Feedback.',
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Representations and Warranties',
    pretext: 'Merchant represents and warrants that:',
    sectionTerms: [
      {
        text:
          'Merchant has the right, power and authority to enter into this Agreement;',
      },
      {
        text:
          'Merchant, if required by applicable law, is registered for sales and use tax collection purposes in all jurisdictions where Merchant’s goods and services will be provided;',
      },
      {
        text:
          'the Offer, upon being delivered by Tastiest, will be available immediately for redemption and Merchant will have sufficient goods and/or services available for redemption through the Offer Expiration Date (i.e., a number of goods and/or services sufficient to fulfil its redemption obligations in connection with the applicable Maximum Number of Offers);',
      },
      {
        text:
          'the terms and conditions of the Offer, including any discounts or goods and services offered thereunder do not and will not violate any, local, country, provincial, territorial law, statute, rule, regulation, or order, including but not limited to, any law or regulation governing the use, sale, and distribution of alcohol and any laws governing offers, vouchers, gift cards, coupons, and gift certificates;',
      },
      {
        text:
          'the Merchant’s fulfilment of the Offer  will result in the bona fide provision of goods and/or services by Merchant to the purchaser;',
      },
      {
        text:
          'Merchant owns all interest in and to the Merchant IP and has licensing rights in (with the right to sublicense to Tastiest) the Third Party IP, and has the right to grant the Licence stated in this Agreement;',
      },
      {
        text:
          'the Merchant IP and the Third Party IP, the Merchant Offering, Tastiest’s use and promotion thereof, and the results of such Merchant Offerings, will not infringe, dilute, misappropriate, or otherwise violate, anywhere in the world, any patent, copyright, logo, trademark, service mark, trade name, rights in designs, or other intellectual property right or right of privacy or publicity of any third party or any applicable law, and does not and will not result from the misappropriation of any trade secret or the breach of any confidentiality obligations to any person or entity;',
      },
      {
        text:
          'the Merchant IP and Third Party IP does not include any material that is unlawful, threatening, abusive, defamatory, vulgar, obscene, profane or otherwise objectionable, or that encourages conduct that constitutes a criminal offense, gives rise to civil liability or otherwise violates any law;',
      },
      {
        text:
          'the Offers and any advertising or promotion of Merchant’s goods and services relating thereto will not constitute false, deceptive or unfair advertising or disparagement under any applicable law;',
      },
      {
        text:
          'Merchant and its employees, contractors and agents have had the proper education and training and hold all required and up-to-date regulatory authorization, licenses and certifications relating to any Merchant Offering to provide the goods or services described in this Agreement;',
      },
      {
        text:
          'Merchant’s business information and direct deposit details as provided in this Agreement, indicating where payments should be forwarded are accurate and Merchant is the authorized entity to receive the funds forwarded by Tastiest;',
      },
      {
        text:
          'Merchant is not authorized to resell, broker or otherwise disclose any Customer Data (as defined in this Agreement) to any third party, in whole or in part, for any purpose, and Merchant is not authorized to copy or otherwise reproduce any Customer Data other than for the purpose of fulfilling or verifying the validity of Offers in connection with this Agreement and',
      },
      {
        text: 'the Merchant Offering is:',
        children: [
          {
            text: 'free from defects in workmanship, materials and design,',
          },
          {
            text:
              'merchantable and suitable for the purposes, if any, stated in the Agreement, and',
          },
          {
            text:
              ' genuine, bona fide products, as described herein and does not violate the rights of any third party.',
          },
        ],
      },
    ],
  },
  {
    title: 'Indemnification',
    pretext: (
      <p>
        To the extent allowed under applicable law, Merchant agrees to defend,
        indemnify and hold Tastiest, its affiliated and related entities, and
        any of its respective officers, directors, agents and employees,
        harmless from and against any claims, lawsuits, investigations,
        penalties, damages, losses or expenses (including but not limited to
        reasonable solicitor’s fees and costs) arising out of or relating to any
        of the following:
      </p>
    ),
    sectionTerms: [
      {
        text:
          'any breach or alleged breach by Merchant of this Agreement, or the representations and warranties made in this Agreement;',
      },
      {
        text:
          'any claim for sales, use, or similar tax obligations of Merchant arising from the sale and fulfilment of an Offer;',
      },
      {
        text:
          'any claim by any governmental body or entity for unredeemed Offers or unredeemed cash values of Offers or any other amounts under any applicable abandoned or unclaimed property or escheat law, including but not limited to any claims for penalties and interest;',
      },
      {
        text:
          'any claim arising out of a violation of any law or regulation by  Merchant or governing Merchant’s goods and/or services; ',
      },
      {
        text:
          'any claim arising out of Merchant’s violation of law or regulation governing the use, sale, and distribution of alcohol;',
      },
      {
        text:
          'any claim by a purchaser or anyone else arising out of or relating to the goods and services provided by Merchant and/or pick up of the goods and services at the Redemption Site, including but not limited to, any claims for false advertising, product defects, personal injury, death, or property damages;',
      },
      {
        text: 'any claim by a purchaser for the Amount Paid;',
      },
      {
        text:
          'any claim arising out of Merchant’s misuse of Customer Data, or any violation of an applicable data privacy or security law; and',
      },
      {
        text:
          'any claim arising out of Merchant’s negligence, fraud or wilful misconduct. Tastiest maintains the right to control its own defence and to choose and appoint its own defence counsel, regardless of the presence or absence of a conflict of interest between Tastiest and Merchant. Merchant’s duty to defend and indemnify Tastiest includes the duty to pay Tastiest’s reasonable solicitor’s fees and costs, including any expert fees.',
      },
    ],
    postText: (
      <p>
        In the event that the Merchant terminates or otherwise breaches this
        Agreement before any Offer has been promoted or provided on the Tastiest
        website and/or app, Merchant agrees to indemnify Tastiest for any loss
        incurred in the hiring of videographers, editors, photographers or any
        other individuals for the purpose of creating a Storyboard or
        promotional material for an Offer.
      </p>
    ),
  },
  {
    title: 'Confidentiality',
    pretext: (
      <p>
        The terms for the Merchant Offering described in this Agreement are
        confidential, and Merchant agrees not to disclose the terms described in
        this Agreement to any party (other than to its employees, parent
        companies, shareholders, lawyers and accountants on a strict
        need-to-know basis or as required by applicable public records and other
        law, if Merchant has taken the necessary precautions of the kind
        generally taken with confidential information to preserve the
        confidentiality of the information made available to such parties). In
        the event of a breach, Tastiest is entitled to injunctive relief and a
        decree for specific performance, and any other relief allowed under
        applicable law (including monetary damages if appropriate).
      </p>
    ),
    sectionTerms: [],
  },
  {
    title: 'Limitation of Liability',
    pretext: (
      <p>
        Except for merchant’s indemnification obligations hereunder, in no event
        is either party liable or obligated to the other party or any third
        party for any lost profits, lost business, special, incidental,
        exemplary, consequential, punitive, or indirect damages regardless of
        the form of action, whether in contract, tort or otherwise, even if
        informed of the possibility of any such damages in advance. Tastiest’s
        sole and complete liability to merchant for any claims arising out of or
        relating to this agreement, or any errors, omissions or misplacements of
        any offer is limited to the amount of fees retained by tastiest
        hereunder for the preceding six(6) months after final calculation and
        reconciliation of all refunds. This limitation of liability applies to
        the maximum extent permitted by applicable law and notwithstanding the
        failure of any limited remedy. In addition, any claim by or on behalf of
        a merchant in connection with any payment made by tastiest, including,
        but not limited to, claims alleging that a merchant was underpaid, must
        be made in writing to tastiest within thirty (30) days from the date
        tastiest remits the payment at issue. All claims not made in accordance
        with the foregoing shall be deemed waived, released and discharged by
        merchant.
      </p>
    ),
    sectionTerms: [],
  },
  {
    title: 'Dispute Resolution',
    pretext:
      'All disputes arising out of, or relating in any way to this Agreement, shall be resolved pursuant to this Section 13 Dispute Resolution.',
    sectionTerms: [
      {
        label: 'Binding Arbitration',
        text:
          'Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity, enforcement or termination, shall be referred to and finally resolved by arbitration in accordance with the Arbitration Act 1996 or any re-enactment or modification of such Act for the time being in force. The number of arbitrators shall be one. The seat, or legal place, of arbitration shall be London, England. The governing law of the Agreement shall be the substantive law of England and Wales.',
      },
      {
        label: 'Class Action/Collective Action Waiver',
        text:
          'We each agree that we shall bring any dispute against the other in our respective individual capacities and not as a claimant or class member in any purported class, representative proceeding or as an association. In addition, we each agree that disputes shall be arbitrated only on an individual basis and not in a class, consolidated or representative action. The arbitrator does not have the power to vary these provisions.',
      },
      {
        label: 'Injunctive Relief/Solicitors’ Fees',
        text:
          'Notwithstanding anything to the contrary in this Agreement, either party may bring a claim in court seeking an injunction or other equitable relief arising out of or relating to claims that the other party’s conduct may cause the other irreparable injury. In the event Tastiest is the prevailing party in any Dispute, subject to any exceptions in this Section 13, Merchant shall pay to Tastiest all reasonable solicitors’ fees and costs incurred by Tastiest in connection with any Dispute.',
      },
    ],
  },
  {
    title: 'Other',
    sectionTerms: [
      {
        text:
          'The parties are independent contractors. Nothing in this Agreement is to be construed to create a joint venture, partnership, franchise, or an agency relationship between the parties. Neither party has the authority, without the other party’s prior written approval, to bind or commit the other in any way.',
      },
      {
        text:
          'This Agreement constitutes the entire agreement between the parties relating to its subject matter and supersedes all prior or contemporaneous oral or written agreements concerning such subject matter.',
      },
      {
        text:
          'Merchant is not authorized to transfer or assign its rights or obligations under this Agreement, whether by operation of law or otherwise, without Tastiest’s prior written consent. Any waiver must be in writing and signed by an authorized signatory of Tastiest. Tastiest is authorized to transfer or assign this Agreement to a present or future affiliate or pursuant to a merger, consolidation, reorganization or sale of all or substantially all of the assets or business, or by operation of law, without notice to Merchant.',
      },
      {
        text:
          'Except as expressly stated in this Agreement, neither party makes any representations or warranties, express nor implied, including but not limited to any implied warranty of merchantability, fitness for a particular purpose or non-infringement. Tastiest does not warrant or guarantee that the services offered on or through the website will be uninterrupted or error-free, that the offers are error-free, or that any merchant offering will result in any revenue or profit for merchant.',
      },
      {
        text:
          'This Agreement and any dispute or claim arising out of or in connection with it or its subject matter or formation (including non-contractual disputes or claims) shall be governed by and construed in accordance with English Law and the parties hereby submit to the exclusive jurisdiction of the English courts.',
      },
      {
        text:
          'The failure or delay of Tastiest to exercise or enforce any of its rights under the Agreement shall not be deemed to be a waiver of any such rights nor shall any partial exercise or enforcement of them operate so as to bar the exercise or enforcement of them at any time subsequently.',
      },
      {
        text:
          'The illegality or invalidity of any part of the Agreement and/or any provision of the Agreement shall not affect the legality or validity of the remainder of the Agreement and/or provision of it.',
      },
    ],
  },
];

const Terms = () => {
  return (
    <>
      <Head>
        <title>{METADATA.TITLE_SUFFIX}</title>
        <meta
          property="og:title"
          content="Tastiest food no matter where you are"
          key="title"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <div className="flex justify-center py-20">
        <div
          style={{ maxWidth: '700px' }}
          className="flex flex-col items-center w-full h-full space-y-16 text-sm"
        >
          <BrandTitle />
          <Introduction />
          <Definitions definitions={definitions} />

          {sections.map((section, index) => (
            <Section
              key={uuid()}
              title={section.title}
              number={index + 1}
              pretext={section.pretext}
              postText={section.postText}
              sectionTerms={section.sectionTerms}
            />
          ))}

          {/* <AcceptForm /> */}
        </div>
      </div>
    </>
  );
};

const BrandTitle = () => (
  <div className="relative flex flex-col items-center w-full py-8">
    <BrandIcon className="h-8 fill-current text-primary" />

    <h1 className="mt-6 text-2xl font-medium leading-none text-center">
      Tastiest Technologies Ltd.
      <br />
      Merchant Terms and Conditions
    </h1>

    <div
      style={{
        clipPath:
          'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 calc(100% - 1rem), 100% calc(100% - 1rem), 100% 1rem, 0 1rem, 0 1rem)',
      }}
      className="absolute inset-0 border-2 rounded-lg pointer-events-none border-secondary"
    ></div>
  </div>
);

const Introduction = () => (
  <div>
    <p>
      These Merchant Terms and Conditions (the{' '}
      <b className="font-medium">“Terms and Conditions”</b>) govern and are
      incorporated into the Tastiest Merchant Agreement between Tastiest
      Technologies Ltd and Merchant (collectively, the{' '}
      <b className="font-medium">“Agreement”</b>). The effective date is the
      date signed at the bottom of this Agreement. Tastiest, subject to the
      provisions of this paragraph, may amend the Terms and Conditions in its
      sole discretion and at any time. The most recent version of the Terms and
      Conditions (as may be amended by Tastiest from time to time) will be
      available:
      <ol style={{ listStyleType: 'lower-roman' }} className="ml-6 font-bold">
        <li>
          <p className="font-normal">
            in Tastiest’s Merchant Admin Panel, and/or
          </p>
        </li>
        <li>
          {' '}
          <p className="font-normal">in a notification Email from Tastiest.</p>
        </li>
      </ol>
    </p>

    <p className="pt-4">
      Merchant agrees that either or both of these notification methods
      constitute adequate notice to inform Merchant of any amendments to the
      Agreement and Merchant further agrees to be bound by any such amendments
      to the Agreement upon such notification.
    </p>
  </div>
);

type ParagraphElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

interface IDefinition {
  term: string;
  termAlternate?: string;
  definition: string | ReactNode;
}

interface DefinitionsProps {
  definitions: IDefinition[];
}

const Definitions = ({ definitions }: DefinitionsProps) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      <h2 className="text-2xl font-bold ">Definitions</h2>

      {definitions.map(item => (
        <p key={uuid()} className="inline">
          <span className="font-medium">“{item.term}”</span>{' '}
          {item.termAlternate && (
            <>
              or <span className="font-medium">“{item.termAlternate}”</span>{' '}
            </>
          )}
          means {item.definition}
        </p>
      ))}
    </div>
  );
};

interface SectionProps extends ISection {
  number: number;
}

const Section = (props: SectionProps) => {
  const { title, number, pretext, postText, sectionTerms } = props;
  const formattedNumber = number < 10 ? `0${number}` : String(number);

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-bold text-left">
        <span className="mr-1 text-primary">{formattedNumber}</span> {title}
      </h2>

      {pretext && <p>{pretext}</p>}

      <ol style={{ listStyle: 'lower-alpha' }} className="mt-2 ml-5 font-bold">
        {sectionTerms.map(term => (
          <li key={uuid()} className="pb-2">
            {term.label && <p className="ml-2 font-bold">{term.label}</p>}
            <p className="pl-2 font-normal">{term.text}</p>
            {term.children && (
              <ol
                style={{ listStyle: 'lower-roman' }}
                className="mt-2 ml-8 font-bold"
              >
                {term.children.map(_term => (
                  <li key={uuid()}>
                    <p className="ml-2 font-normal">{_term.text}</p>
                  </li>
                ))}
              </ol>
            )}

            {term.suffix && (
              <div>
                <p className="mt-2 font-normal">{term.suffix.text}</p>

                <ol
                  style={{ listStyle: 'lower-roman' }}
                  className="mt-2 ml-8 font-bold"
                >
                  {term.suffix.children?.map(_term => (
                    <li key={uuid()}>
                      <p className="ml-2 font-normal">{_term.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </li>
        ))}
      </ol>

      {postText && <p>{postText}</p>}
    </div>
  );
};

export default Terms;
