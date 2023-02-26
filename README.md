## API WILAYAH INDONESIA

### Pendahuluan
Api ini buat menggunakan expressJs dan MongoDb, pastikan sebelum menggunakan Api ini sudah 
memiliki database terlebih dahulu. Untuk demo bisa menggunakan alamat ```https://api.smpvanilla.com:5024```.

Jika terdapat error bisa langsung buka issue yang ada di github, terimakasih 😊.

### 1. Provinsi

| No. | Methode | endpoint  | params | query    | body | keterangan |
|-----|---------|-----------|--------|----------|------|------------|
| 1 | GET | /province | -      | id, name | -    | mendapatkan data options maupun data provinsi  |

#### a. Contoh Response GET

contoh reponse menggunakan query ````name```` jawa :
````
{
    count: 3,
    options: [
        {
            label: "JAWA BARAT",
            value: "32"
        },
        {
            label: "JAWA TENGAH",
            value: "33"
        },
        {
            label: "JAWA TIMUR",
            value: "35"
        }
    ]
}
````

contoh reponse menggunakan query ````id```` 32 :
````
{
    _id: "63facbc40188b9f105c97567",
    name: "JAWA BARAT",
    code_province: "32",
    longitude: 107.64047,
    latitude: -6.88917
}
````
> note :
> Jika tanpa query maka akan mengambil semua data

### 2. Kabupaten / Kota
| No. | Methode | endpoint | params | query                 | body | keterangan                                          |
|-----|---------|----------|--------|-----------------------|------|-----------------------------------------------------|
| 1 | GET | /regency | -      | id, name, province_id | -    | mendapatkan data options maupun data kota/kabupaten |

#### a. Contoh Response GET
contoh response menggunakan query ````name```` bandung :
````
[
    {
        label: "KABUPATEN BANDUNG",
        value: "3204"
    },
    {
        label: "KABUPATEN BANDUNG BARAT",
        value: "3217"
    },
    {
        label: "KOTA BANDUNG",
        value: "3273"
    }
]
````

contoh response menggunakan query ````id```` 3273 :
````
{
    _id: "63facc3ba84c80fa7b099b41",
    name: "KOTA BANDUNG",
    code_regency: "3273",
    code_province: "32",
    longitude: 107.62444,
    latitude: -6.9175,
    updatedAt: "2023-02-26T03:25:09.292Z"
}
````

contoh response menggunakan query ````province_id```` 32 :
````
[
    { 
        label: "KABUPATEN BOGOR",
        value: "3201"
    },
    {
        label: "KABUPATEN SUKABUMI",
        value: "3202"
    },
    {
        label: "KABUPATEN CIANJUR",
        value: "3203"
    }, .... 
]
````

contoh response menggunakan query ````province_id```` dan ```name``` 32 dan bandung:
````
[
    {
        label: "KABUPATEN BOGOR",
        value: "3201"
    },
    {
        label: "KABUPATEN SUKABUMI",
        value: "3202"
    },
    {
        label: "KABUPATEN CIANJUR",
        value: "3203"
    }, ...
]
````

> note :
> salah satu query diperlukan

### 3. Daerah
| No. | Methode | endpoint  | params | query                 | body | keterangan                                  |
|-----|---------|-----------|--------|-----------------------|------|---------------------------------------------|
| 1 | GET | /district | -      | id, name, regency_id | -    | mendapatkan data options maupun data Daerah |

#### a. Contoh Response GET
contoh response menggunakan query ````name```` bandung :
````
{
    count: 8,
    options: [
        {
        label: "KABANDUNGAN",
        value: "3202|3202300"
        },
        {
        label: "BANDUNG KULON",
        value: "3273|3273010"
        },
        {
        label: "BANDUNG KIDUL",
        value: "3273|3273080"  
        } , ...
    ]
}        
````
> note :
> format data value diatas yaitu : `<id regency> | <id district>`

contoh response menggunakan query ````id```` 3504020 :
````
{
    _id: "63fb1be2829bb3d4bace420b",
    name: "BANDUNG",
    code_districts: "3504020",
    code_regency: "3504",
    longitude: 107.61912,
    latitude: -6.91746
}
````

contoh response menggunakan query ````regency_id```` 3504 :
````
{
    count: 19,
    options: [
        {
            label: "BANDUNG",
            value: "3504|3504020"
        },
        {
            label: "BESUKI",
            value: "3504|3504010"
        },
        {
            label: "CAMPUR DARAT",
            value: "3504|3504040"
        }, ....
    ]
}
````
> note :
> format data value diatas yaitu : `<id regency> | <id district>`

contoh response menggunakan query ````regency_id```` dan ```name``` 3504 dan bandung :
````
{
    count: 19,
    options: [
        {
            label: "BANDUNG",
            value: "3504|3504020"
        },
        {
            label: "BESUKI",
            value: "3504|3504010"
        },
        {
            label: "CAMPUR DARAT",
            value: "3504|3504040"
        }, ...
    ]
}
````

> note :
> format data value diatas yaitu : `<id regency> | <id district>`, 
> salah satu query diperlukan

### 4. Desa
| No. | Methode | endpoint | params | query                 | body | keterangan                                |
|-----|---------|----------|--------|-----------------------|------|-------------------------------------------|
| 1 | GET | /village | -      | id, name, district_id | -    | mendapatkan data options maupun data Desa |

#### a. Contoh Response GET
contoh response menggunakan query ````name```` bandung :
````
{
    count: 98,
    options: [
        {
            label: "BANDUNG JAYA",
            value: "1114080|1114080033"
        },
        {
            label: "GUNUNG BANDUNG",
            value: "1219041|1219041011"
        },
        {
            label: "TAMAN BANDUNG",
            value: "1503050|1503050002"
        }, ...
    ]
}        
````
> note :
> format data value diatas yaitu : `<id district> | <id village>`

contoh response menggunakan query ````id```` 1503050002 :
````
{
    _id: "63facc8a99355894b2868dae",
    name: "TAMAN BANDUNG",
    code_village: "1503050002",
    code_district: "1503050",
    longitude: 0,
    latitude: 0
}
````

contoh response menggunakan query ````district_id```` 1503050 :
````
{
    count: 14,
    options: [
        {
            label: "SEKO BESAR",
            value: "1503050|1503050001"
        },
        {
            label: "TAMAN BANDUNG",
            value: "1503050|1503050002"
        },
        {
            label: "SEPINTUN",
            value: "1503050|1503050003"
        }, ...
    ]
}
````
> note :
> format data value diatas yaitu : `<id district> | <id village>`

contoh response menggunakan query ````district_id```` dan ```name``` 1503050 dan taman :
````
{
    count: 14,
    options: [
        {
            label: "SEKO BESAR",
            value: "1503050|1503050001"
        },
        {
            label: "TAMAN BANDUNG",
            value: "1503050|1503050002"
        },
        {
            label: "SEPINTUN",
            value: "1503050|1503050003"
        }, ...
    ]
}
````


> note :
> format data value diatas yaitu : `<id district> | <id village>`, 
> salah satu query diperlukan