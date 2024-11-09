import React from "react";
import "./aggreement.scss";
import Navbar from "../../../common/navbar";

const Terms = () => {
  return (
    <div className="terms">
      {/* <Navbar /> */}
      <div className="container terms-list ">
        <h3 className="text-center fw-bold m-0  py-5   main-head">
          Disclaimer Platform
        </h3>
        <div className="row col-lg-11 mx-auto">
          {platformContent?.map((val, index) => (
            <div className="my-2 ">
              <h5 className="fw-semibold"> {val?.heading}</h5>
              <p className="ps-2">{val?.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms;

const platformContent = [
  {
    heading: "Valuation Framework",
    body: (
      <>
        <p>
          The following framework outlines how Anyma makes decisions around the
          valuations of its portfolio companies on its financial statements. The
          purpose of this document is to maintain consistency and transparency
          with the risk profile of our investments as it relates to their “Fair
          Market Value.”
        </p>
      </>
    ),
  },
  {
    heading: "General Approach",
    body: (
      <p>
        Portfolio companies are generally valued based on their most recent
        priced financing round.
      </p>
    ),
  },
  {
    heading: "Subsequent SAFE or Note Rounds",
    body: (
      <>
        <p>
          {" "}
          In instances where a company raises capital through a Note or a SAFE
          following our investment, we will not update the valuation until those
          instruments convert into equity, unless:
        </p>
        <ul>
          <li>
            Entry Valuation Discounted Compared to Current SAFE/Note: If we
            invest via a SAFE at a lower valuation (e.g., a discounted entry
            price) compared to the ongoing SAFE or Note valuation, we may
            reflect the higher valuation implied by the current round, thus
            recognising the implied upside from our discounted entry.
          </li>
          <li>
            Significant Growth Since Investment: If the company has demonstrated
            substantial growth following our investment, such as increased
            revenue or significant market expansion, we may adjust the fair
            market value to reflect the most recent SAFE or Note valuation, even
            before these instruments have converted into equity.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Secondary Round Investment",
    body: "If our investment was made during a discounted secondary round, we will maintain the company’s valuation at that price until a new priced round occurs, without automatically adjusting to the valuation of the most recent primary round.",
  },
  {
    heading: "Net Returns",
    body: "All net return values presented on this platform are calculated after deducting entry fees and carried interest.",
  },
  {
    heading: "Information Disclaimer",
    body: "The returns and valuations presented on this platform are calculated internally by Anyma and have not been officially audited. These figures are provided for informational purposes only and do not guarantee accuracy or future performance.",
  },
  {
    heading: "Site Introduction",
    body: (
      <>
        <p>
          This site is operated by ANYMA CAPITAL LTD. ANYMA CAPITAL LTD is a
          company registered in England and Wales with company number 13080797.
          Its registered office is at 1 Doughty Street, London, England, WC1N
          2PH and is an Appointed Representative of Finex LLP, which is
          authorised and regulated in the UK by the Financial Conduct Authority
          (“FCA”) with firm reference number 507537 and ICO number ZB418417.
        </p>
        <p>
          ANYMA CAPITAL LTD is compensated by the hedge fund manager or company
          it represents. The manager or company has a standard fee schedule and
          is not adding a differential to compensate ANYMA CAPITAL LTD, which
          means there is no additional cost to the investor in utilizing ANYMA
          CAPITAL LTD services. ANYMA CAPITAL LTD is not affiliated with and has
          no relationship with the hedge fund managers or company it represents
          other than a separate written agreement covering their marketing and
          consulting services for the benefit of the hedge fund manager or
          company.
        </p>
        <p>
          By using this site, you are agreeing to these terms of use. ANYMA
          CAPITAL LTD may change these terms at any time without further notice
          to you, and you are responsible for periodically reviewing these terms
          for updates. Your continued use of this site constitutes agreement by
          you to all such changes.
        </p>
        <p>
          This site is not intended for any person in any jurisdiction where
          ANYMA CAPITAL LTD would become subject to license or registration
          regulations of that jurisdiction, or the publication or availability
          of the contents is prohibited.
        </p>
      </>
    ),
  },
  {
    heading: "Description of this Site",
    body: (
      <>
        <p>
          This site is for informational purposes only. It is not intended as
          and should not be construed as financial, investment, tax, legal,
          regulatory, or other advice.
        </p>
        <p>
          None of the contents of this site is an offer to sell or the
          solicitation of any offer to buy securities in any investment vehicle
          or account sponsored, managed and/or advised by ANYMA CAPITAL LTD
          (each a “Product”). It is not an offer or sale of securities in the
          United States or to, or for the account or benefit of, any US person
          (as defined in relevant US securities laws, including residents of the
          United States or partnerships or corporations organised there). Unless
          specifically stated, no fund or company referred to on this site has
          been registered under the US Investment Company Act of 1940 and no
          interests therein are registered under the US Securities Act of 1933.
        </p>
      </>
    ),
  },
  {
    heading: "Intellectual Property",
    body: `The contents of this site are the intellectual property of ANYMA CAPITAL LTD and its third-party licensors and may not be copied, distributed, uploaded, posted, republished, decompiled, disassembled, reverse-engineered or transmitted in any way without the prior written consent of ANYMA CAPITAL LTD. The intellectual property rights in the ANYMA CAPITAL LTD name and logo are owned by ANYMA CAPITAL LTD. Nothing in these terms or on this site should be construed as granting any licence or right to use the ANYMA CAPITAL LTD name or logo or any other contents of this site. ANYMA CAPITAL LTD enforces and will enforce any infringements of its intellectual property rights to the fullest extent permitted by the law.`,
  },
  {
    heading: "No Warranty",
    body: `None of ANYMA CAPITAL LTD, its directors or employees makes any representations or warranties regarding this site or its contents (including but not limited to, with respect to accuracy, adequacy, reliability, timeliness, completeness or suitability) and all contents are provided “as is”. ANYMA CAPITAL LTD, to the fullest extent permitted by law, expressly disclaims all representations and warranties, express or implied, as to this site and its contents, including any implied warranties of merchantability, fitness for a particular purpose, title, non-infringement and availability. ANYMA CAPITAL LTD also disclaims liability for errors and omissions in this site and its contents.`,
  },
  {
    heading: "Liability and Indemnity",
    body: (
      <>
        <p>
          In no event shall ANYMA CAPITAL LTD, its directors or employees be
          liable for any claims, liabilities, losses, costs or damages of any
          kind, including (i) direct, indirect, consequential, punitive,
          exemplary, incidental or special losses or (ii) loss of profit, loss
          of business, business interruption, loss of business opportunity or
          loss of data arising out of or in any way connected with (a) your use
          of or inability to access and/or use this site, (b) the contents of
          this site, or (c) the contents of any third party sites linked or
          linking to this site. The foregoing applies even if ANYMA CAPITAL LTD,
          its directors or employees have been advised of the possibility of
          such claims, liabilities, losses, costs or damages or could have
          foreseen them. ANYMA CAPITAL LTD, its directors and employees shall
          not be responsible for any failure by you or any third party to comply
          with these terms or with applicable law. If any part of this term is
          unenforceable under applicable law, the aggregate liability of ANYMA
          CAPITAL LTD, its directors and employees will be limited to the
          maximum extent permitted by such law and shall in no event exceed
          £100.
        </p>
        <p>
          Your sole remedy for dissatisfaction with your use of this site is to
          cease using this site. You agree, at your own expense, to indemnify,
          defend and hold ANYMA CAPITAL LTD, its directors, members and
          employees harmless from and against any claims, liabilities, losses,
          costs or damages of any kind (including any legal fees and costs)
          suffered or incurred by these parties in connection with any claim
          arising out of any breach of these terms by you. You shall cooperate
          as fully as reasonably required or requested in the defence of any
          such claim. ANYMA CAPITAL LTD may, at its own expense, assume the
          exclusive defence and control of any matter otherwise subject to
          indemnification by you and you shall not in any event settle any
          matter without the written consent of ANYMA CAPITAL LTD.
        </p>
      </>
    ),
  },
  {
    heading: "Third Party Sites",
    body: `ANYMA CAPITAL LTD is not responsible for the contents of any third-party sites linked or linking to this site and disclaims all liability arising from your use of or reliance on such sites, their contents and any products and services referred to on such sites. Your use of any such sites is at your own risk. ANYMA CAPITAL LTD’s inclusion of links to third party sites does not imply any endorsement of any kind by ANYMA CAPITAL LTD of such third parties, their sites or their products or services.`,
  },
  {
    heading: "Prohibited Acts",
    body: (
      <>
        <p>
          You must not use any data mining, robots or similar data gathering or
          extraction programs or methods, whether automated or manual, to
          access, acquire, copy or monitor any portion of this site or any of
          its contents.
        </p>
        <p>
          You must not misuse this site by knowingly introducing viruses,
          trojans, worms, logic bombs or other material that is malicious or
          technologically harmful. You must not attempt to gain unauthorised
          access to this site, the server on which it is stored or any server,
          computer or database connected to this site. You must not attack this
          site via a denial-of-service attack or a distributed denial-of service
          attack. By breaching this provision, you would commit a criminal
          offence under the Computer Misuse Act 1990 (UK). ANYMA CAPITAL LTD
          will report any such breach to the relevant law enforcement
          authorities and will co-operate with those authorities by disclosing
          your identity to them. In the event of such a breach, your right to
          use this site will cease immediately.
        </p>
      </>
    ),
  },
  {
    heading: "Forward-looking Statements",
    body: (
      <>
        This site and its contents may contain forward-looking statements that
        are based on current indicators, expectations and assumptions that ANYMA
        CAPITAL LTD believes to be reasonable but are subject to a wide range of
        risks and uncertainties and, therefore, there can be no assurance that
        actual results will not differ from those expressed or implied by such
        forward-looking statements. These statements speak only as of the date
        on which they are made.
      </>
    ),
  },
  {
    heading: "General",
    body: (
      <>
        <p>
          {" "}
          A failure by ANYMA CAPITAL LTD to enforce a provision of these terms
          or act on a breach or default by you does not constitute a waiver of
          any of ANYMA CAPITAL LTD’s rights or remedies.
        </p>
        <p>
          These terms constitute the entire agreement between ANYMA CAPITAL LTD
          and you with respect of your use of this site and they supersede all
          prior or contemporaneous communications, agreements and understandings
          between ANYMA CAPITAL LTD and you with respect to the subject matter
          hereof.
        </p>
        <p>
          These terms are governed by and shall be construed in accordance with
          the laws of England and Wales. You agree that the Courts of England
          shall have exclusive jurisdiction over any disputes arising in
          relation to use and browsing of this site.
        </p>
        <p>
          Please send any questions about these terms or the contents of this
          site to: info@anyma.capital
        </p>
      </>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <>
        <p>
          We may collect information about your computer, including where
          available your IP address, the company name from which you are
          browsing our website, operating system and browser type. This is
          purely data about our types of users, browsing actions and patterns,
          and does not identify any individual unless they provide us with their
          details. For the same reason, we may obtain information about your
          general internet usage by using a cookie file which is stored on the
          hard drive of your computer. Cookies contain information that is
          transferred to your computer's hard drive. You may refuse to accept
          cookies by activating the setting on your browser which allows you to
          refuse the setting of cookies. However, if you select this setting you
          may be unable to access certain parts of our site. They help us to
          improve our site and to deliver a better and more personalised
          service. They enable us:
        </p>
        <ul>
          <li>To estimate our audience size and usage pattern.</li>
          <li>
            To store information about your preferences, and so allow us to
            customise our site according to your individual interests.
          </li>
          <li>To speed up your searches.</li>
          <li>To recognise you when you return to our site.</li>
        </ul>
        <p>
          Unless you have adjusted your browser setting so that it will refuse
          cookies, our system will issue cookies when you log on to our site.
          Please note that our partners may also use cookies, over which we have
          no control.
        </p>
      </>
    ),
  },
];
