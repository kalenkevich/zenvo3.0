class CacheService:
    _inner_cache = dict()

    @staticmethod
    def get(key):
        return CacheService._inner_cache.get(key)

    @staticmethod
    def set(key, value):
        CacheService._inner_cache[key] = value

        return True

    @staticmethod
    def clear(key):
        CacheService._inner_cache[key] = None

        return True
