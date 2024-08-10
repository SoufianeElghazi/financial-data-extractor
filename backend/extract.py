from pdf2image import convert_from_path
import numpy as np
import cv2
import pytesseract
import cv2
import re

def pdf_to_image(pdf_path):
    images = convert_from_path(pdf_path, dpi=300)  
    if images:
        return images[0] 
    return None

def find_table_in_image(pil_image):
    open_cv_image = np.array(pil_image)
    open_cv_image = open_cv_image[:, :, ::-1].copy()
    gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    margin = []
    thresh1 = 50 
    thresh2 = 20  
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        if w > thresh1 and h > thresh2:
            margin.append([x, y, x + w, y + h])
    if margin:
        margin.sort(key=lambda r: (r[3] - r[1]) * (r[2] - r[0]), reverse=True)
        return margin[0]  
    return None

def find_table_in_image_and_create_image(pil_image, file_path):
    open_cv_image = np.array(pil_image)
    open_cv_image = cv2.cvtColor(open_cv_image, cv2.COLOR_RGB2BGR) 
    gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)    
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        if w > 50 and h > 20: 
            cv2.rectangle(open_cv_image, (x, y), (x + w, y + h), (0, 0, 255), 2) 
    output_image_path = file_path.replace('.pdf', '_marked.png')
    cv2.imwrite(output_image_path, open_cv_image)
    return output_image_path

def crop_to_table(image, bounds):
    if bounds:
        x, y, x2, y2 = bounds
        return image.crop((x, y, x2, y2))
    return None

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
def extract_text_from_image(image):
    if image:
        return pytesseract.image_to_string(image, lang='fra') 
    return ""

patterns = {
    'Charges à répartir sur plusieurs exercices': r"Charges à repartir sur plusieurs exercices ([\d\s,]+)",
    'Primes de remboursement des obligations': r"Primes de remboursement des obligations ([\d\s,]+)",
    'Immobilisations en recherche et développement': r"Immobilisations en recherche et développement ([\d\s,]+)",
    'Brevets, marques, droits et valeurs similaires': r"Brevets, marques, droits et valeurs similaires ([\d\s,]+)",
    'Terrains': r"Terrains ([\d\s,]+)",
    'Constructions': r"Constructions ([\d\s,]+)",
    'Installations techniques, matériel et outillage': r"Installations techniques, matériel et outillage ([\d\s,]+)",
    'Matériel de transport': r"Matériel de transport ([\d\s,]+)",
    'capital social': r"capital\s+social[^0-9]*([\d\s,]+)",
    'prime d\'émission': r"prime\s+d'émission[^0-9]*([\d\s,]+)",
    'réserves consolidées': r"réserves\s+consolidées[^0-9]*([\d\s,]+)",
    'résultat consolidé': r"résultat\s+consolidé[^0-9]*([\d\s,]+)",
    'total capitaux propres': r"total\s+capitaux\s+propres[^0-9]*([\d\s,]+)",
    'immobilisations corporelles': r"immobilisations\s+corporelles[^0-9]*([\d\s,]+)",
    'total actif': r"total\s+actif[^0-9]*([\d\s,]+)",
    'total passif': r"total\s+passif[^0-9]*([\d\s,]+)",
    'total general i+1ii+ iii':r"total\sgeneral\si[^0-9]*([\d\s,]+)",
}

def extract_financials(data, patterns=patterns):
    results = {}
    data = data.lower()
    for key, pattern in patterns.items():
        match = re.search(pattern, data, re.DOTALL)
        if match:
            num = match.group(1).replace(' ', '').replace(',', '.')
            try:
                results[key] = float(num)
            except ValueError:
                results[key] = None  
    return results

