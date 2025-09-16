import styles from './styles.module.scss'

const LicenseAgreement = () => {
  return (
    <section className={styles.privacy}>
      <div className={styles.privacy__inner}>
        <h1 className={styles.privacy__title}>
          <span>End-User License Agreement (EULA)</span>
        </h1>
        <h2 className={styles.privacy__published}>Last updated: September, 8, 2025</h2>
        <div className='style_guides'>
          <div>
            <p>This End-User License Agreement (“Agreement”) is between you (“User,” “you”) and <strong>Maksim Shamkou</strong> (“Company,” “we,” “our,” or “us”) regarding your use of the mobile application <strong>Kaelis AI: Tarot & Astrology</strong> (“App”). By downloading, installing, or using the App, you agree to be bound by this Agreement.</p>
          </div>
          <div>
            <ol>
              <li data-title>
                <h2>License Grant</h2>
                <ul>
                  <li><span>We grant you a <strong>limited, non-exclusive, non-transferable, revocable license</strong> to use the App for personal, non-commercial purposes in accordance with this Agreement.</span></li>
                  <li><span>You are not granted any rights of ownership in the App.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Restrictions</h2>
                <p>You may not:</p>
                <ul>
                  <li><span>Copy, reproduce, modify, or distribute the App or any part of it.</span></li>
                  <li><span>Reverse-engineer, decompile, disassemble, or attempt to extract the source code.</span></li>
                  <li><span>Rent, lease, sell, sublicense, or transfer the App.</span></li>
                  <li><span>Use the App for unlawful purposes or in violation of applicable laws.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Ownership</h2>
                <ul>
                  <li><span>The App, including all intellectual property rights, is and remains the exclusive property of the Company.</span></li>
                  <li><span>All trademarks, logos, and service marks are owned by the Company or its licensors.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Updates and Changes</h2>
                <ul>
                  <li><span>We may provide updates, bug fixes, or new features.</span></li>
                  <li><span>This Agreement applies to all updates unless a separate license is provided.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Disclaimer</h2>
                <ul>
                  <li><span>The App provides <strong>lifestyle and entertainment services only</strong>.</span></li>
                  <li><span>It does not provide medical, psychological, legal, or financial advice.</span></li>
                  <li><span>You use the App at your own risk.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Limitation of Liability</h2>
                <p>To the maximum extent permitted by law:</p>
                <ul>
                  <li><span>The Company shall not be liable for any indirect, incidental, or consequential damages.</span></li>
                  <li><span>Our total liability is limited to the amount paid (if any) for using the App during the last 12 months.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Termination</h2>
                <ul>
                  <li><span>This Agreement is effective until terminated.</span></li>
                  <li><span>We may suspend or terminate your access if you violate this Agreement.</span></li>
                  <li><span>Upon termination, you must stop using the App and delete all copies.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Governing Law</h2>
                <ul>
                  <li><span>This Agreement shall be governed by and construed in accordance with the laws of <strong>Poland</strong>, without regard to conflict-of-law principles.</span></li>
                  <li><span>Users from other regions retain rights under applicable local laws.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Contact Us</h2>
                <p>If you have questions about this Agreement, please contact us:</p>
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

export default LicenseAgreement