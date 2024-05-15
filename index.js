(function() {
    window.fbq = function() {};
    var installFBPixel = function() {
      !function(f,b,e,v,n,t,s)
      {n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '182076140712433'); 
      fbq('track', 'PageView');
    }
     
    const post = (endpoint, data) => {
      return new Promise((resolve) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        })
        const request = new XMLHttpRequest();
        request.open("POST", endpoint);
        request.send(formData); 

        request.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            resolve()
          }
        }
      });
    }

    window.__ch_log = function(event, opt_eventData, opt_callback) {
      if (opt_callback) {
        // Do this even if logging is disabled.
        setTimeout(opt_callback, 100);
      }

      

      var data = {
        "event": event,
        "content_data": JSON.parse(document.querySelector('#__ch_content_data')?.innerText || '{}'),
      };
      if (opt_eventData) {
        data["event_data"] = JSON.stringify(opt_eventData);
      }
      post("/__log", data);
        
      
    };

    setTimeout(function() {
      __ch_log("pageview", {"referer": document.referrer || null});

      if (/\bfbclid=/.test(document.location.href)) {
        // Only install the FB pixel on referrals from FB.
        installFBPixel();
      }

      Array.from(document.querySelectorAll('a')).forEach((ele) => {
        const href = ele.getAttribute('href');
        ele.addEventListener('click', (e) => {
          e.preventDefault();
          __ch_log("click", { href }, function() {
            window.location.href = href;
          });

        // Log FB conversion.
        if (
          href.indexOf("/app") == 0 ||
          href.indexOf("/ios_app") == 0 ||
          href.indexOf("/android_app") == 0 ||
          href.indexOf("clubhouse.app.link") > 0
        ) {
          fbq("track", "Lead");
        }
        })
    
      });
    }, 0);
  })();