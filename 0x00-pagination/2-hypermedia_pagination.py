#!/usr/bin/env python3
"""
Hypermedia pagination
"""
import csv
import math
from typing import Tuple, List, Dict, Any


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Return a tuple of size two containing a start
    index and an end index corresponding to the range
    of indexes to return in a list for
    those particular pagination parameters

    Args:
        page (int); the number of the page
        Page_size (int): the number of items per page

    Returns:
        Tuple[int, int]: start and end indexes of current page.
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Retrieves a specific page of the dataset of popular baby names.

        Args:
            page (int, optional): the number of the page to retrieve.
            Defaults to 1.
            page_size (int, optional): the number of items per page.
            Defaults to 10.

        Returns:
            List[List]: a list of rows representing the requested
            page of the dataset.
        """
        assert type(page) == int
        assert type(page_size) == int
        assert page > 0
        assert page_size > 0
        csv_size = len(self.dataset())
        start, end = index_range(page, page_size)
        end = min(end, csv_size)
        if start >= csv_size:
            return []
        return self.dataset()[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """ Retrieves a specific page of the dataset of popular baby names
        along with pagination metadata.

        Args:
            page (int, optional): The number of the page to retrieve.
            Defaults to 1.
            page_size (int, optional): The number of items per page.
            Defaults to 10.

        Returns:
            Dict: A dictionary containing the following key-value pairs:
            page_size (int): the length of the returned dataset page.
            page (int): the current page number.
            data (List[List]): the dataset page.
            next_page (int or None): number of the next page,
            None if no next page
            prev_page (int or None): number of the previous page,
            None if no previous page
            total_pages (int): the total number of pages
            in the dataset as an integer.

        Raises:
            AssertionError: If either of the input arguments
            is not an integer greater than 0
        """
        total_pages = math.ceil(len(self.dataset()) / page_size)
        return {
            "page_size": page_size,
            "page": page,
            "data": self.get_page(page, page_size),
            "next_page": page + 1 if page + 1 <= total_pages else None,
            "prev_page": page - 1 if page > 1 else None,
            "total_pages": total_pages
        }
