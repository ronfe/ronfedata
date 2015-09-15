__master__= 'ronfe'

# before use this
# 1. run landingPageCalc.js on robomongo
# 2. touch a filenamed 'yourFileName.txt' with step1's result

# how to use:
# 1. put your unencoded file into the same directory of this script
# 2. run python transUrlSendMmai.py 'yourFileName.txt'
# 3. and the script will REPLACE the file you send in
# 4. checkout result on email

import os, urllib2, sys
import smtplib
from email.mime.image import MIMEImage
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

##############unquote file part#################
pwd = os.path.dirname(os.path.realpath(__file__))
os.chdir(pwd)

def transfertext(textFile):
    fileName = textFile
    f = open(fileName).readlines()
    g = []
    for each in f:
        g.append(urllib2.unquote(each))

    g = ''.join(g)

    k = open(fileName, 'w')
    k.write(g)
    k.close()
    sendMail(textFile)

##############send mail part#################
def sendMail(textFile):
    server = smtplib.SMTP_SSL(host='smtp.qq.com', port=465)
    username = "xingze@guanghe.tv"
    password = "5866871loop"
    fromaddr = "xingze@guanghe.tv"
    toaddrs = "xingze@guanghe.tv"
    fp = open(textFile, 'rb')
    msg = MIMEText(fp.read())
    fp.close()
    server.set_debuglevel(1)
    msg['Subject'] = "landing page data in %s" % textFile
    server.login(username, password)
    server.sendmail(fromaddr, toaddrs, str(msg))
    server.quit()

##############send mail part#################

if __name__ == "__main__":
    transfertext(sys.argv[1])
