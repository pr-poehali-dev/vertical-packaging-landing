import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from typing import Dict, Any, List

cache = {
    'data': None,
    'timestamp': None
}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get products from XML feed with daily caching
    Args: event with httpMethod, queryStringParameters; context with request_id
    Returns: HTTP response with products list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    now = datetime.now()
    
    if cache['data'] and cache['timestamp']:
        cache_age = now - cache['timestamp']
        if cache_age < timedelta(days=1):
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'public, max-age=86400'
                },
                'body': json.dumps(cache['data']),
                'isBase64Encoded': False
            }
    
    feed_url = 'https://t-sib.ru/bitrix/catalog_export/export_Vvf.xml'
    target_categories = {'296', '297', '298', '301', '302', '305'}
    
    req = urllib.request.Request(
        feed_url,
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    
    with urllib.request.urlopen(req, timeout=30) as response:
        xml_data = response.read()
    
    root = ET.fromstring(xml_data)
    ns = {'': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    
    categories = {}
    for category in root.findall('.//category'):
        cat_id = category.get('id')
        cat_name = category.text
        if cat_id:
            categories[cat_id] = cat_name
    
    products: List[Dict[str, Any]] = []
    
    for offer in root.findall('.//offer'):
        category_id = offer.find('categoryId')
        if category_id is not None and category_id.text in target_categories:
            product = {
                'id': offer.get('id'),
                'name': offer.find('name').text if offer.find('name') is not None else '',
                'price': offer.find('price').text if offer.find('price') is not None else '',
                'currency': offer.find('currencyId').text if offer.find('currencyId') is not None else 'RUB',
                'category_id': category_id.text,
                'category_name': categories.get(category_id.text, ''),
                'url': offer.find('url').text if offer.find('url') is not None else '',
                'picture': offer.find('picture').text if offer.find('picture') is not None else '',
                'vendor': offer.find('vendor').text if offer.find('vendor') is not None else '',
                'description': offer.find('description').text if offer.find('description') is not None else ''
            }
            products.append(product)
    
    result = {
        'products': products,
        'total': len(products),
        'updated_at': now.isoformat()
    }
    
    cache['data'] = result
    cache['timestamp'] = now
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=86400'
        },
        'body': json.dumps(result),
        'isBase64Encoded': False
    }
