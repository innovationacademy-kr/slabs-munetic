# 데이터베이스
MariaDB를 사용합니다.

## ER 다이어그램

- 마크다운 기반의 mermaid를 사용하였습니다.
    - [https://mermaid-js.github.io/mermaid/#/](https://mermaid-js.github.io/mermaid/#/)
- 선정 이유
    - 마크다운 편집기 혹은 뷰어에서 mermaid를 지원한다면 어디서든 출력 가능합니다.
    - 마크다운 기반 코드이므로 문법이 단순하며 편집 및 수정도 단순합니다.

```mermaid
erDiagram
    CATEGORY ||--|{ LESSON : hasMany
    USER ||--o{ LESSON : hasMany
    USER ||--o{ BOOKMARK : hasMany
    BOOKMARK ||--|{ LESSON : hasMany
    USER ||--o{ COMMENT : hasMany
    LESSON ||--o{ COMMENT : hasMany
    USER ||--o{ LESSON_LIKE : hasMany
    LESSON_LIKE ||--|{ LESSON : hasMany
    USER ||--o| TUTOR_INFO : hasOne
    CATEGORY {
        integer id
        string name
        DATE createdAt
        DATE updatedAt
        DATE deletedAt
    }
    LESSON {
        integer id
        integer tutor_id
        integer catrgory_id
        string title
        integer price
        string location
        number minute_per_lesson
        string content
        string youtube
        DATE createdAt
        DATE updatedAt
        DATE deletedAt
    }
    USER {
        integer id
        ENUM type
        string login_id
        string login_password
        string nickname
        string name
        string name_public
        DATE birth
        ENUM gender
        string email
        string phone_number
        bool phone_public
        string image_url
        string introduction
        DATE createdAt
        DATE updatedAt
        DATE deletedAt
    }
    BOOKMARK {
        integer id
        integer user_id
        integer lesson_id
        DATE createdAt
        DATE updatedAt
        DATE deletedAt
    }
    COMMENT {
        integer id
        integer user_id
        integer lesson_id
        string content
        integer stars
        DATE createdAt
        DATE updatedAt
        DATE deletedAt
    }
    LESSON_LIKE {
        integer id
        integer user_id
        integer lesson_id
        DATE createdAt
        DATE updatedAt
        DATE deletedAt
    }
    TUTOR_INFO {
        integer id
        integer user_id
        string spec
        string career
        string youtube
        string instagram
        string soundcloud
        DATE createdAt
        DATE updatedAt
        DATE deletedAt
    }
```