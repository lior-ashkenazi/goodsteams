package com.goodsteams.libraryservice.dao;

import com.goodsteams.libraryservice.entity.OwnedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OwnedBookRepository extends JpaRepository<OwnedBook, Long> {

    List<OwnedBook> findByUserId(Long userId);
}
