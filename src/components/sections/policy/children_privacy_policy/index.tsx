import styles from './styles.module.scss'

const ChildrenPrivacyPolicy = () => {
  return (
    <section className={styles.privacy}>
      <div className={styles.privacy__inner}>
        <h1 className={styles.privacy__title}>
          <span>Children’s Privacy Policy</span>
        </h1>
        <h2 className={styles.privacy__published}>Last updated: September, 8, 2025</h2>
        <div className='style_guides'>
          <div>
            <p><strong>Kaelis AI: Tarot & Astrology</strong> (“App,” “we,” “our”) respects the privacy of young people. Protecting children’s personal information is especially important to us.</p>
          </div>
          <div>
            <ol>
              <li data-title>
                <h2>Age Restriction</h2>
                <ul>
                  <li><span>The App is intended for <strong>adults aged 18 and older only</strong>.</span></li>
                  <li><span>We do not knowingly collect, use, or share personal information from anyone under the age of 18.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>No Collection of Children’s Data</h2>
                <ul>
                  <li><span>We do not request, collect, or process personal data of children.</span></li>
                  <li><span>If a user under 18 attempts to create an account, we will take steps to block or delete it.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Parents and Guardians</h2>
                <ul>
                  <li><span>If you are a parent or guardian and believe that your child may have provided us with personal data, please contact us immediately at <strong>info.kaelis@gmail.com</strong>.</span></li>
                  <li><span>Upon verification, we will delete such information without delay.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Compliance with COPPA</h2>
                <ul>
                  <li><span>We comply with the <strong>Children’s Online Privacy Protection Act (COPPA)</strong> and international laws regarding children’s privacy.</span></li>
                  <li><span>Our App is <strong>not directed to children under 18</strong> and is explicitly restricted for adult use only.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Updates to this Policy</h2>
                <p>We may update this Children’s Privacy Policy as required by law or platform rules. Updates will be posted in the App and on our website.</p>
              </li>
              <li data-title>
                <h2>Contact Us</h2>
                <p>If you have questions about our children’s privacy practices, please contact:</p>
                <p><strong>Maksim Shamkou</strong></p>
                <p><strong>info.kaelis@gmail.com</strong></p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChildrenPrivacyPolicy