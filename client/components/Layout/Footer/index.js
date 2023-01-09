const Footer = () => {
  return (
    <footer className='pt-5 pb-5 bg-black'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-4'>
            <h4 className='mb-3 text-white'>Customer Service</h4>

            <ul className='list-unstyled gap-3 text-gray'>
              <li>
                <a href='#'>My Account</a>
              </li>
              <li>
                <a href='#'>Order History</a>
              </li>
              <li>
                <a href='#'>FAQ</a>
              </li>
              <li>
                <a href='#'>Specials</a>
              </li>
              <li>
                <a href='#'>Help Center</a>
              </li>
            </ul>
          </div>

          <div className='col-sm-12 col-md-4'>
            <h4 className='mb-3 text-white'>Corporation</h4>

            <ul className='list-unstyled text-gray'>
              <li>
                <a href='#'>About us</a>
              </li>
              <li>
                <a href='#'>Customer Service</a>
              </li>
              <li>
                <a href='#'>Company</a>
              </li>
              <li>
                <a href='#'>Investor Relations</a>
              </li>
              <li>
                <a href='#'>Advanced Search</a>
              </li>
            </ul>
          </div>

          <div className='col-sm-12 col-md-4'>
            <h4 className='mb-3 text-white'>Why Choose Us</h4>

            <ul className='list-unstyled text-gray'>
              <li>
                <a href='#'>Shopping Guide</a>
              </li>
              <li>
                <a href='#'>Blog</a>
              </li>
              <li>
                <a href='#'>Company</a>
              </li>
              <li>
                <a href='#'>Investor Relations</a>
              </li>
              <li>
                <a href='#'>Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='container pt-3'>
        <div className='row'>
          <div className='d-flex justify-content-center text-white'>
            &copy; 2022 Online Learning Platform.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
